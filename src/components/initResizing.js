export function initResizing() {
  function setListeners() {
    let pageX;
    let currentColumn;
    let nextColumn;
    let currentColumnWidth;
    let nextColumnWidth;

    let pageY;
    let currentRow;
    let nextRow;
    let currentRowHeight;
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
      if (!e.target.dataset.resizeColumn) {
        return;
      }

      currentColumn = e.target.parentElement;
      pageX = e.pageX;
      currentColumnWidth = currentColumn.offsetWidth;

      document.addEventListener('mousemove', onMove);
    });

    document.addEventListener('mousedown', (e) => {
      if (!e.target.dataset.resizeRow) {
        return;
      }

      currentRow = e.target.parentElement;
      pageY = e.pageY;
      currentRowHeight = currentRow.offsetHeight;

      document.addEventListener('mousemove', onMove);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMove);
      currentColumn = null;
      nextColumn = null;
      pageX = null;
      nextColumnWidth = null;
      currentColumnWidth = null;

      pageY = null;
      currentRow = null;
      nextRow = null;
      currentRowHeight = null;
      nextRowHeight = null;
    });
  }

  setListeners();
}
