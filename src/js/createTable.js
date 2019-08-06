export const createTable = () => {
  const app = document.getElementById('app');
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  const columns = 10;
  const rows = 20;

  table.appendChild(tableBody);

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement('tr');
    tableBody.appendChild(tr);

    for (let j = 0; j < columns; j++) {
      const td = document.createElement('td');
      td.appendChild(document.createTextNode('Cell ' + i + ',' + j));
      tr.appendChild(td);
    }
  }

  app.appendChild(table);
};
