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

  document.addEventListener('click', (event) => {
    const { align } = event.target.dataset;

    if (!align) {
      return;
    }

    if (align === 'left') {
      console.log('Выравнивание по левому краю');
    } else if (align === 'center') {
      console.log('Выравнивание по центру');
    } else if (align === 'right') {
      console.log('Выравнивание по правому краю');
    }
  });
}
