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

    const transformEl = (groupCells) =>
      Array.from(groupCells).map((cell) => ({ el: cell }));

    if (select === 'column') {
      const columnCells = document.querySelectorAll(
        `[data-column="${column}"]`,
      );
      checkSelection(transformEl(columnCells));
    }

    if (selectRow === 'row') {
      const rowCells = document.querySelectorAll(`[data-row="${rowId}"]`);
      checkSelection(transformEl(rowCells));
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

    selection.applyStyle({ textAlign: position });
  });
}
