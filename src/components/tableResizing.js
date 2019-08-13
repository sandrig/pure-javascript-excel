export function tableResizing(selector) {
  const table = document.querySelector(selector);
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
}
