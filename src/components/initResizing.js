export function initResizing() {
  function setListeners() {
    let pageX;
    let pageY;
    let currentColumn;
    let currentRow;
    let currentColumnWidth;
    let currentRowHeight;

    const onMove = (event) => {
      if (currentColumn) {
        const diffX = event.pageX - pageX;
        currentColumn.style.width = `${currentColumnWidth + diffX}px`;
      }

      if (currentRow) {
        const diffY = event.pageY - pageY;
        currentRow.style.height = `${currentRowHeight + diffY}px`;
      }
    };

    document.addEventListener('mousedown', (event) => {
      const draggable = event.target.closest('.resizable');
      const draggableColumn = draggable.classList.contains('resizable--column');
      const draggableRow = draggable.classList.contains('resizable--row');

      if (!draggable) return;

      if (draggableColumn) {
        currentColumn = event.target.parentElement;
        pageX = event.pageX;
        currentColumnWidth = currentColumn.offsetWidth;
      }

      if (draggableRow) {
        currentRow = event.target.parentElement;
        pageY = event.pageY;
        currentRowHeight = currentRow.offsetHeight;
      }

      document.addEventListener('mousemove', onMove);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMove);
      pageX = null;
      pageY = null;
      currentColumn = null;
      currentRow = null;
      currentColumnWidth = null;
      currentRowHeight = null;
    });
  }

  setListeners();
}
