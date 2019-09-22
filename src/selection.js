import { saveData } from './store';

export class Selection {
  constructor() {
    this.selectedCells = [];
  }

  add(id, el) {
    const isSelectedCell = this.selectedCells.some((cell) => cell.id === id);
    if (this.selectedCells.length === 0) {
      el.classList.add('selected');
      this.selectedCells.push({ id, el });
    } else if (!isSelectedCell) {
      el.classList.add('selected');
      this.selectedCells.push({ id, el });
    } else {
      this.delete(id);
    }
  }

  group(cells) {
    this.selectedCells = [...this.selectedCells, ...cells];
    this.selectedCells.forEach((cell) => {
      cell.el.classList.add('selected');
    });
  }

  delete(id) {
    this.selectedCells = this.selectedCells
      .map((cell) => {
        if (cell.id === id) {
          cell.el.classList.remove('selected');
        }
        return cell;
      })
      .filter((cell) => cell.id !== id);
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
