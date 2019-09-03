export class Selection {
  constructor() {
    this.selectedItems = [];
  }

  add(el) {
    this.selectedItems.push(el);
    el.classList.add('table__cell--selected');
  }

  delete(el) {
    this.selectedItems = this.selectedItems.filter((item) => item === el);
  }

  clear() {
    const columnClass = 'selected';
    const cellClass = 'table__cell--selected';
    this.selectedItems.forEach((item) => {
      item.classList.remove(columnClass, cellClass);
    });
    this.selectedItems = [];
  }

  addAll(items) {
    const columnClass = 'selected';
    const cellClass = 'table__cell--selected';
    this.selectedItems = [...items];
    this.selectedItems.forEach((item) => {
      item.classList.add(columnClass);
      item.classList.remove(cellClass);
    });
  }

  applyStyles(position) {
    if (this.selectedItems.length !== 1) {
      this.selectedItems.forEach((item, i) => {
        if (i === 0) {
          return;
        }
        item.style.textAlign = position;
      });
    } else {
      this.selectedItems.forEach((item) => {
        item.style.textAlign = position;
      });
    }
  }
}
