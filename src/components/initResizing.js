export function initResizing() {
  function setListeners() {
    let pageX;
    let pageY;
    let currentColumn;
    let currentRow;
    let nextColumn;
    let nextRow;
    let currentColumnWidth;
    let currentRowHeight;
    let nextColumnWidth;
    let nextRowHeight;

    const onMove = (e) => {
      if (currentColumn) {
        const diffX = e.pageX - pageX;
        if (nextColumn) nextColumn.style.width = `${nextColumnWidth - diffX}px`;
        currentColumn.style.width = `${currentColumnWidth + diffX}px`;
      }

      if (currentRow) {
        const diffY = e.pageY - pageY;
        if (nextRow) nextRow.style.height = `${nextRowHeight - diffY}px`;
        currentRow.style.height = `${currentRowHeight + diffY}px`;
      }
    };

    document.addEventListener('mousedown', (e) => {
      if (e.target.dataset.resizeColumn) {
        currentColumn = e.target.parentElement;
        pageX = e.pageX;
        currentColumnWidth = currentColumn.offsetWidth;
      } else if (e.target.dataset.resizeRow) {
        currentRow = e.target.parentElement;
        pageY = e.pageY;
        currentRowHeight = currentRow.offsetHeight;
      } else {
        return;
      }

      document.addEventListener('mousemove', onMove);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMove);
      pageX = null;
      pageY = null;
      currentColumn = null;
      currentRow = null;
      nextColumn = null;
      nextRow = null;
      currentColumnWidth = null;
      currentRowHeight = null;
      nextColumnWidth = null;
      nextRowHeight = null;
    });
  }

  setListeners();
}
