import { saveData } from './store';

export class Selection {
  constructor() {
    this.selectedCells = [];
  }

  add(id, el) {
    const isSelectedCell = this.selectedCells.find((cell) => cell.id === id);
    if (this.selectedCells.length === 0) {
      el.classList.add('selected');
      this.selectedCells.push({ id, el });
    } else if (!isSelectedCell) {
      el.classList.add('selected');
      this.selectedCells.push({ id, el });
    } else {
      this.delete(id);
      el.classList.remove('selected');
    }
  }

  group(cells) {
    this.selectedCells = this.selectedCells.concat(cells);
    this.selectedCells.forEach((cell) => {
      cell.el.classList.add('selected');
    });
  }

  delete(id) {
    const foundCell = this.selectedCells.find((cell) => cell.id === id);
    this.selectedCells = this.selectedCells.filter(
      (cell) => cell.id !== foundCell.id,
    );
  }

  clear() {
    this.selectedCells.forEach((cell) => {
      cell.el.classList.remove('selected');
    });
    this.selectedCells = [];
  }

  applyStyle({ key, value }) {
    this.selectedCells.forEach((cell) => {
      const { row, column, select } = cell.el.dataset;
      const id = `${row}:${column}`;
      if (select === 'column') return;
      cell.el.style[key] = value;
      saveData('styleState', id, {
        key,
        value,
      });
    });
  }
}
