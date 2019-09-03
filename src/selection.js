export class Selection {
  constructor() {
    this.selectedItems = [];
  }

  add(el) {
    this.selectedItems.push(el);
    el.classList.add('table__cell_selected');
  }

  delete(el) {
    this.selectedItems = this.selectedItems.filter((item) => item === el);
  }

  clear() {
    const cls = 'table__cell_selected';
    this.selectedItems.forEach((item) => {
      item.classList.remove(cls);
    });
    this.selectedItems = [];
  }

  addAll(items) {
    this.selectedItems = [...items];
  }
}
