const headers = ["№", "A", "B", "C", "D", "E", "F", "G", "H", "I"];
const $table = document.querySelector("table");

const generateTableHead = (table, data) => {
  const thead = table.createTHead();
  const row = thead.insertRow();

  for (let key of data) {
    const th = document.createElement("th");
    const text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};

const generateTable = (table, row, column) => {
  const tbody = table.createTBody();

  for (let i = 0; i < row; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < column; j++) {
      const td = document.createElement("td");
      const input = document.createElement("input");

      if (j === 0) {
        td.classList.add("count");
        td.innerText = i + 1;
        tr.appendChild(td);
      } else {
        input.classList.add("ceil");
        td.appendChild(input);
        tr.appendChild(td);
      }
    }

    tbody.appendChild(tr);
  }
};

const resizableGrid = table => {
  const row = table.getElementsByTagName("tr")[0],
      cols = row ? row.children : undefined;
  if (!cols) return;

  table.style.overflow = "hidden";

  let tableHeight = table.offsetHeight;

  for (let i = 0; i < cols.length; i++) {
    const div = createDiv(tableHeight);
    cols[i].appendChild(div);
    cols[i].style.position = "relative";
    setListeners(div);
  }

  function setListeners(div) {
    let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

    div.addEventListener("mousedown", function(e) {
      curCol = e.target.parentElement;
      nxtCol = curCol.nextElementSibling;
      pageX = e.pageX;

      let padding = paddingDiff(curCol);

      curColWidth = curCol.offsetWidth - padding;
      if (nxtCol) nxtColWidth = nxtCol.offsetWidth - padding;
    });

    div.addEventListener("mouseover", function(e) {
      e.target.style.borderRight = "2px solid #0000ff";
    });

    div.addEventListener("mouseout", function(e) {
      e.target.style.borderRight = "";
    });

    document.addEventListener("mousemove", function(e) {
      if (curCol) {
        let diffX = e.pageX - pageX;

        if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + "px";

        curCol.style.width = curColWidth + diffX + "px";
      }
    });

    document.addEventListener("mouseup", function(e) {
      curCol = null;
      nxtCol = null;
      pageX = null;
      nxtColWidth = null;
      curColWidth = null;
    });
  }

  function createDiv(height) {
    const div = document.createElement("div");
    div.style.top = 0;
    div.style.right = 0;
    div.style.width = "4px";
    div.style.position = "absolute";
    div.style.cursor = "col-resize";
    div.style.userSelect = "none";
    div.style.height = height + "px";
    return div;
  }

  function paddingDiff(col) {
    if (getStyleVal(col, "box-sizing") === "border-box") {
      return 0;
    }

    let paddingLeft = getStyleVal(col, "padding-left");
    let paddingRight = getStyleVal(col, "padding-right");
    return parseInt(paddingLeft) + parseInt(paddingRight);
  }

  function getStyleVal(elem, css) {
    return window.getComputedStyle(elem, null).getPropertyValue(css);
  }
};

export const createTable = (row, column) => {
  generateTable($table, row, column);
  generateTableHead($table, headers);
  resizableGrid($table);
};