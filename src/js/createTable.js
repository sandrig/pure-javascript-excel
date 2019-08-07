export const createTable = () => {
  const column = 10;
  const row = 20;
  const el = document.querySelector('.table');
  const table = document.createElement('table');

  for (let i = 0; i < row; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < column; j++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      td.appendChild(input);
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  el.appendChild(table);
};
