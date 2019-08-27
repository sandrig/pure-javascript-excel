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
    const { align, type, column } = event.target.dataset;
    const el = event.target;
    const cells = Array.from(
      document.querySelectorAll(`[data-column="${column}"]`),
    );
    const selectedCells = Array.from(
      document.querySelectorAll('.table__cell--selected, .selected'),
    );

    if (type === 'cell') {
      selectedCells.length !== 0
        ? selectedCells.forEach((item) =>
            item.classList.remove('table__cell--selected', 'selected'),
          )
        : el.classList.add('table__cell--selected');
    }

    if (type === 'resizable') {
      cells.forEach((item) => {
        if (item.dataset.column === column) {
          item.classList.add('selected');
        }
      });

      selectedCells.forEach((item) => {
        if (item.dataset.column !== column) {
          item.classList.remove('selected');
        }
      });
    }

    if (!align) {
      return;
    }

    const textAlignment = (position) => {
      selectedCells.forEach((item) => (item.style.textAlign = position));
    };

    if (align === 'left') {
      textAlignment('left');
    } else if (align === 'center') {
      textAlignment('center');
    } else if (align === 'right') {
      textAlignment('right');
    }
  });
}
