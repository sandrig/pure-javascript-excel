import { saveData } from './store';

export class Selection {
  constructor() {
    this.selectedCells = [];
  }

  add(el) {
    this.selectedCells.push(el);
    this.selectedCells.forEach((cell) => {
      cell.classList.add('selected');
    });
  }

  group(cells) {
    this.selectedCells = [...this.selectedCells, ...cells];
    this.selectedCells.forEach((cell) => {
      cell.classList.add('selected');
    });
  }

  delete() {}

  clear() {
    this.selectedCells.forEach((item) => {
      item.classList.remove('selected');
    });
    this.selectedCells = [];
  }

  applyStyle({ key, value }) {
    this.selectedCells.forEach((item) => {
      const { row, column, select } = item.dataset;
      const id = `${row}:${column}`;
      if (select === 'column') return;
      item.style[key] = value;
      saveData('styleState', id, {
        key,
        value,
      });
    });
  }
}
