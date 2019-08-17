import { initResizing } from '@/components/initResizing';

function generateTableHead(table, columnsCount) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  row.className = 'row row--header';

  for (let i = 0; i < columnsCount; i++) {
    const th = document.createElement('th');
    const textFirstColumn = document.createTextNode('');
    const textOtherColumn = document.createTextNode(
      `${String.fromCharCode('A'.charCodeAt(0) + i - 1)}`,
    );

    if (i === 0) {
      th.appendChild(textFirstColumn);
      row.appendChild(th);
    } else {
      th.appendChild(textOtherColumn);
      th.className = 'resizable resizable--headers';
      th.insertAdjacentHTML(
        'beforeend',
        "<div class='sep sep--vertical' data-resize-column='vertical'></div>",
      );
      row.appendChild(th);
    }
  }
}

function generateTable(table, row, column) {
  const tbody = table.createTBody();

  for (let i = 0; i < row; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < column; j++) {
      const td = document.createElement('td');
      const editableDiv = document.createElement('div');

      if (j === 0) {
        td.className = 'resizable resizable--numbers';
        td.innerText = i + 1;
        td.insertAdjacentHTML(
          'beforeend',
          "<div class='sep sep--gorizontal' data-resize-row='horizontal'></div>",
        );
        tr.appendChild(td);
      } else {
        editableDiv.setAttribute('contenteditable', 'true');
        td.appendChild(editableDiv);
        tr.appendChild(td);
      }
    }

    tbody.appendChild(tr);
  }
}

export function createTable(selector, rowsCount, columnsCount) {
  const $table = document.getElementById(selector);
  generateTableHead($table, columnsCount);
  generateTable($table, rowsCount, columnsCount);
  initResizing();
}
