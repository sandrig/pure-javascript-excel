import { saveData } from './store';
import { Selection } from './selection';

export function initListeners() {
  const selection = new Selection();

  document.addEventListener('input', (event) => {
    const { type } = event.target.dataset;

    if (type === 'cell') {
      const value = event.target.textContent;
      const { row, column } = event.target.dataset;
      const id = `${row}:${column}`;
      saveData('textState', id, value);
    }
  });

  document.addEventListener('click', (event) => {
    const el = event.target;
    const { position, type, column, select } = event.target.dataset;
    const { select: selectRow, row } = el.parentElement.dataset;

    if (select === 'column') {
      const selectedCells = document.querySelectorAll(
        `[data-column="${column}"]`,
      );

      if (event.metaKey || event.ctrlKey) {
        selection.group(selectedCells);
      } else {
        selection.clear();
        selection.group(selectedCells);
      }
    }

    if (selectRow === 'row') {
      const selectedCells = document.querySelectorAll(`[data-row="${row}"]`);
      if (event.metaKey || event.ctrlKey) {
        selection.group(selectedCells);
      } else {
        selection.clear();
        selection.group(selectedCells);
      }
    }

    if (type === 'cell') {
      if (event.metaKey || event.ctrlKey) {
        selection.add(el);
      } else {
        selection.clear();
        selection.add(el);
      }
    }

    if (!position) return;

    selection.applyStyle({
      key: 'text-align',
      value: position,
    });
  });
}
