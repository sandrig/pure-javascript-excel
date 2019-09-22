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
    const { position, type, column, row, select } = el.dataset;
    const { select: selectRow, row: rowId } = el.parentElement.dataset;
    const id = `${row}:${column}`;
    const checkSelection = (target) => {
      if (event.metaKey || event.ctrlKey) {
        selection.group(target);
      } else {
        selection.clear();
        selection.group(target);
      }
    };

    if (select === 'column') {
      const getAllColumnCells = document.querySelectorAll(
        `[data-column="${column}"]`,
      );
      const selectedColumnCells = [...getAllColumnCells].map((cell) => ({
        el: cell,
      }));
      checkSelection(selectedColumnCells);
    }

    if (selectRow === 'row') {
      const getAllRowCells = document.querySelectorAll(`[data-row="${rowId}"]`);
      const selectedRowCells = [...getAllRowCells].map((cell) => ({
        el: cell,
      }));
      checkSelection(selectedRowCells);
    }

    if (type === 'cell') {
      if (event.metaKey || event.ctrlKey) {
        selection.add(id, el);
      } else {
        selection.clear();
        selection.add(id, el);
      }
    }

    if (!position) return;

    selection.applyStyle({
      key: 'text-align',
      value: position,
    });
  });
}
