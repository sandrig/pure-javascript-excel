import { initResizing } from './resize';
import { getData } from './store';
import { initListeners } from './events';

const COLUMN_DEFAULT_WIDTH = 120;
const ROW_DEFAULT_HEIGHT = 24;

function createRow(row, data) {
  const height = `${getData('rowState', row, ROW_DEFAULT_HEIGHT)}px`;
  return `
    <div
      class="table__row"
      data-type="resizable"
      data-row="${row}"
      data-select="row"
      style="height: ${height};"
    >
      <div class="table__row-counter">
        ${row || ''}
          <div class="table__row-resize" data-resize="row"></div>
      </div>
      <div class="table__row-data">
        ${data}
      </div>
    </div>
  `;
}

function createColumn(columnData, index) {
  const width = `${getData('columnState', index, COLUMN_DEFAULT_WIDTH)}px`;
  return `
    <div
      class="table__column"
      data-column="${index}"
      data-type="resizable"
      data-select="column"
      style="width: ${width};"
    >
      ${columnData}
      <div class="table__column-resize" data-resize="column"></div>
    </div>
  `;
}

function createCell(column, row) {
  const width = `${getData('columnState', column, COLUMN_DEFAULT_WIDTH)}px`;
  const id = `${row}:${column}`;
  const data = getData('textState', id);
  const css = getData('alignState', id);
  return `
    <div
      class="table__cell"
      data-column="${column}"
      data-row="${row}" 
      data-type="cell"
      contenteditable="true"
      style="width: ${width};"
    >${data}</div>
  `;
}

function createTableMarkup(table, rowsCount, columnsCount) {
  const rows = [];
  const columns = new Array(columnsCount)
    .fill('')
    .map((_, i) => String.fromCharCode(65 + i))
    .map(createColumn)
    .join('');

  rows.push(createRow(0, columns));

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(columnsCount)
      .fill('')
      .map((_, index) => createCell(index, i))
      .join('');
    rows.push(createRow(i, cells));
  }

  const tableMarkup = rows.join('');

  table.insertAdjacentHTML('afterbegin', tableMarkup);
}

export function createTable(selector, rowsCount, columnsCount) {
  const $table = document.querySelector(selector);
  createTableMarkup($table, rowsCount, columnsCount);
  initResizing();
  initListeners();
}
