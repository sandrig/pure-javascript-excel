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
    const { position, type } = event.target.dataset;
    const el = event.target;

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
      textAlign: position,
    });

    // const { position, type, column, select } = event.target.dataset;
    // const el = event.target;
    // const { select: selectRow, row } = el.parentElement.dataset;
    //
    // // const selectedCells1 = document.querySelectorAll('.selected');
    // // console.log(selectedCells1);
    //
    // if (select === 'column') {
    //   // const selectedCells = document.querySelectorAll(
    //   //   `[data-column="${column}"]`,
    //   // );
    //
    //   if (!event.metaKey || !event.ctrlKey) {
    //     selection.reset();
    //   }
    //
    //   if (event.metaKey || event.ctrlKey) {
    //     console.log(event.metaKey);
    //     // selection.addGroup1(selectedCells);
    //   }
    //
    //   // selection.addGroup1(selectedCells);
    // }
    // if (selectRow === 'row') {
    //   const selectedCells = document.querySelectorAll(`[data-row="${row}"]`);
    //   if (!event.metaKey || !event.ctrlKey) {
    //     const selectedElements = document.querySelectorAll('.selected');
    //     selectedElements.forEach((item) => {
    //       item.classList.remove('selected');
    //     });
    //   }
    //
    //   if (event.metaKey || event.ctrlKey) {
    //     selection.addGroup(selectedCells);
    //   }
    //
    //   selection.addGroup(selectedCells);
    // }
    //
    // if (type === 'cell') {
    //   if (!event.metaKey || !event.ctrlKey) {
    //     selection.reset();
    //     selection.cell(el);
    //   }
    //
    //   selection.cell(el);
    // }
    //
    // if (!position) return;
    //
    // selection.applyStyles(position);
  });
}
