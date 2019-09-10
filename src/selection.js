import { saveStateValue } from './state';

export class Selection {
  constructor() {
    this.selectedCells = [];
    this.columnClass = 'selected';
    this.cellClass = 'table__cell--selected';
  }

  add(el) {
    this.selectedCells.push(el);
    el.classList.add(this.cellClass);
  }

  clear() {
    this.selectedCells.forEach((item) => {
      item.classList.remove(this.columnClass, this.cellClass);
    });
    this.selectedCells = [];
  }

  addAll(cells) {
    this.selectedCells = [...cells];
    this.selectedCells.forEach((cell) => {
      cell.classList.add(this.columnClass);
      cell.classList.remove(this.cellClass);
    });
  }

  applyStyles(attr, value) {
    if (attr === 'textAlign') {
      this.selectedCells.forEach((_, i) => {
        const { row, column, select } = this.selectedCells[i].dataset;
        const id = `${row}:${column}`;
        if (select === 'column') return;
        this.selectedCells[i].style.textAlign = value;
        saveStateValue('alignTextState', id, value);
      });
    }
  }
}
