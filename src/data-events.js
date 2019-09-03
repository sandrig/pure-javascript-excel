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
    const { column, select } = event.target.dataset;

    if (select === 'column') {
      const selectedItems = document.querySelectorAll(
        `[data-column="${column}"]`,
      );
      selection.clear();
      selection.addAll(selectedItems);
    }
  });
}
