const $table = document.querySelector('table');

const generateTableHead = (table, columnsCount) => {
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
};

const generateTable = (table, row, column) => {
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
};

export const resizableGrid = (table) => {
  const row = table.getElementsByTagName('tr')[0];
  const cols = row ? row.children : undefined;
  if (!cols) return;

  const tableHeight = table.offsetHeight;

  function getStyleVal(elem, css) {
    return window.getComputedStyle(elem, null).getPropertyValue(css);
  }

  function paddingDiff(col) {
    if (getStyleVal(col, 'box-sizing') === 'border-box') {
      return 0;
    }

    const paddingLeft = getStyleVal(col, 'padding-left');
    const paddingRight = getStyleVal(col, 'padding-right');
    return parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);
  }

  function setListeners(div) {
    let pageX;
    let curCol;
    let nxtCol;
    let curColWidth;
    let nxtColWidth;

    div.addEventListener('mousedown', (e) => {
      curCol = e.target.parentElement;
      nxtCol = curCol.nextElementSibling;
      pageX = e.pageX;

      const padding = paddingDiff(curCol);

      curColWidth = curCol.offsetWidth - padding;
      if (nxtCol) nxtColWidth = nxtCol.offsetWidth - padding;
    });

    div.addEventListener('mouseover', (e) => {
      e.target.style.borderRight = '2px solid #0000ff';
    });

    div.addEventListener('mouseout', (e) => {
      e.target.style.borderRight = '';
    });

    document.addEventListener('mousemove', (e) => {
      if (curCol) {
        const diffX = e.pageX - pageX;

        if (nxtCol) nxtCol.style.width = `${nxtColWidth - diffX}px`;

        curCol.style.width = `${curColWidth + diffX}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      curCol = null;
      nxtCol = null;
      pageX = null;
      nxtColWidth = null;
      curColWidth = null;
    });
  }

  function createDiv(height) {
    const div = document.createElement('div');
    div.style.top = '0px';
    div.style.right = '0px';
    div.style.width = '4px';
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';
    div.style.height = `${height}px`;
    return div;
  }

  for (let i = 0; i < cols.length; i++) {
    const div = createDiv(tableHeight);
    cols[i].appendChild(div);
    cols[i].style.position = 'relative';
    setListeners(div);
  }
};

export const createTable = (rowsCount, columnsCount) => {
  generateTable($table, rowsCount, columnsCount);
  generateTableHead($table, columnsCount);
  resizableGrid($table);
};
