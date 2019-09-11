import { saveData } from './store';

export class Selection {
  constructor() {
    this.selected = [];
  }

  add() {}

  group() {}

  delete() {}

  clear() {}

  applyStyles() {}
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
