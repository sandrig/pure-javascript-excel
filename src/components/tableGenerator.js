import { tableResizing } from '@/components/tableResizing';

function generateTableHead(selector, columnsCount) {
  const table = document.querySelector(selector);
  const thead = table.createTHead();
  const row = thead.insertRow();

  for (let i = 0; i < columnsCount; i++) {
    const th = document.createElement('th');
    const textFirstColumn = document.createTextNode('№');
    const textOtherColumn = document.createTextNode(
      `${String.fromCharCode('A'.charCodeAt(0) + i - 1)}`,
    );

    if (i === 0) {
      th.appendChild(textFirstColumn);
      row.appendChild(th);
    } else {
      th.appendChild(textOtherColumn);
      row.appendChild(th);
    }
  }
}

function generateTable(selector, row, column) {
  const table = document.querySelector(selector);
  const tbody = table.createTBody();

  for (let i = 0; i < row; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < column; j++) {
      const td = document.createElement('td');
      const input = document.createElement('input');

      if (j === 0) {
        td.classList.add('count');
        td.innerText = i + 1;
        tr.appendChild(td);
      } else {
        input.classList.add('ceil');
        td.appendChild(input);
        tr.appendChild(td);
      }
    }

    tbody.appendChild(tr);
  }
}

export function createTable(selector, rowsCount, columnsCount) {
  generateTable(selector, rowsCount, columnsCount);
  generateTableHead(selector, columnsCount);
  tableResizing(selector);
}
