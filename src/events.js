import { saveStateValue } from './state';
import { Selection } from './selection';

export function initListeners() {
  const selection = new Selection();

  document.addEventListener('input', (event) => {
    const { type } = event.target.dataset;
    if (type === 'cell') {
      const value = event.target.textContent;
      const { row, column } = event.target.dataset;
      const id = `${row}:${column}`;
      saveStateValue('textState', id, value);
    }
  });

  document.addEventListener('click', (event) => {
    const { position, type, column, select } = event.target.dataset;
    // debugger;
    const el = event.target;

    if (select === 'column') {
      selection.clear();
      const selectedCells = document.querySelectorAll(
        `[data-column="${column}"]`,
      );
      selection.addAll(selectedCells);
    }

    if (type === 'cell') {
      selection.clear();
      selection.add(el);
    }

    if (!position) return;

    selection.alignText(position);
  });
}
