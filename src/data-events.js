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
    const { align, type } = event.target.dataset;
    const el = event.target;
    const selectedEl = Array.from(
      document.querySelectorAll('.table__cell--selected'),
    );

    if (type === 'cell') {
      selectedEl.length !== 0
        ? selectedEl.forEach((item) =>
            item.classList.remove('table__cell--selected'),
          )
        : el.classList.add('table__cell--selected');
    }

    if (event.target.dataset.column) {
      // console.log(event.target.dataset.column);
      const columnId = event.target.dataset.column;
      const selector = `table__cell, [data-column="${columnId}"]`;
      const columns = Array.from(document.querySelectorAll(selector));
      columns.forEach((item) => item.classList.add('table__cell--selected'));
    }

    if (!align) {
      return;
    }

    const textAlignment = (position) => {
      selectedEl.forEach((item) => (item.style.textAlign = position));
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
