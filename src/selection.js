import { saveData } from './store';

export class Selection {
  constructor() {
    this.selected = [];
  }

  add(el) {
    this.selected.push(el);
    this.selected.forEach((cell) => {
      cell.classList.add('selected');
    });
  }

  group() {}

  delete() {}

  clear() {
    this.selected.forEach((item) => {
      item.classList.remove('selected');
    });
    this.selected = [];
  }

  applyStyle(attr) {
    this.selected.forEach((item) => {
      const { row, column, select } = item.dataset;
      const id = `${row}:${column}`;
      if (select === 'column') return;
      item.style.textAlign = attr.textAlign;
      saveData('alignState', id, { textAlign: attr.textAlign });
    });
  }
}

// export class Selection {
//   constructor() {
//     this.selectedCells = [];
//   }
//
//   cell(el) {
//     this.selectedCells.push(el);
//     this.selectedCells.forEach((cell) => {
//       cell.classList.add('selected');
//     });
//   }
//
//   addGroup(cells) {
//     this.selectedCells = [...cells];
//     this.selectedCells.forEach((cell) => {
//       cell.classList.add('selected');
//     });
//   }
//
//   addGroup1(cells) {
//     // this.selectedCells = [...cells];
//     // this.selectedCells.forEach((cell) => {
//     //   cell.classList.add('selected');
//     // });
//     // const selectedCells1 = document.querySelectorAll('.selected');
//     // this.selectedCells = [...selectedCells1];
//     // console.log(this.selectedCells);
//   }
//
//   clear() {
//     this.selectedCells.forEach((item) => {
//       item.classList.remove('selected');
//     });
//     this.selectedCells = [];
//   }
//
//   applyStyles(value) {
//     this.selectedCells.forEach((item) => {
//       const { row, column, select } = item.dataset;
//       const id = `${row}:${column}`;
//       if (select === 'column') return;
//       item.style.textAlign = value;
//       saveStateValue('alignTextState', id, value);
//     });
//   }
// }
