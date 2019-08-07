const headers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const table = document.querySelector('table');
const row = 20;
const column = 10;

const generateTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement('th');
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};

const generateTable = table => {
  for (let i = 0; i < row; i++) {
    let tr = document.createElement('tr');

    for (let j = 0; j < column; j++) {
      let td = document.createElement('td');
      let input = document.createElement('input');
      td.appendChild(input);
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
};

export const createTable = () => {
  generateTable(table);
  generateTableHead(table, headers);
};
