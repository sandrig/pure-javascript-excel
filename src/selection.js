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

  alignText(position) {
    if (this.selectedCells.length !== 1) {
      Object.keys(this.selectedCells).forEach((id, i) => {
        if (i === 0) {
          return;
        }
        const { row, column } = this.selectedCells[id].dataset;
        const key = `${row}:${column}`;
        this.selectedCells[id].style.textAlign = position;
        saveStateValue('alignTextState', key, position);
      });
    } else {
      Object.keys(this.selectedCells).forEach((id) => {
        const { row, column } = this.selectedCells[id].dataset;
        const key = `${row}:${column}`;
        this.selectedCells[id].style.textAlign = position;
        saveStateValue('alignTextState', key, position);
      });
    }
  }
}
