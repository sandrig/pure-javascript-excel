import { saveContentCell } from './state';

export function initListeners() {
  document.addEventListener('input', (event) => {
    const { type } = event.target.dataset;
    if (type === 'cell') {
      const value = event.target.textContent;
      const { row, column } = event.target.dataset;
      const id = `${row}:${column}`;
      saveContentCell(id, value);
    }
  });
}
