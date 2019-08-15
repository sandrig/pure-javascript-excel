export function initResizing() {
  const row = document.getElementById('row-head');
  const cols = row ? row.children : undefined;
  if (!cols) return;

  function setListeners() {
    let pageX;
    let currentColumn;
    let nextColumn;
    let currentColumnWidth;
    let nextColumnWidth;

    const onMove = (e) => {
      if (currentColumn) {
        const diffX = e.pageX - pageX;
        if (nextColumn) nextColumn.style.width = `${nextColumnWidth - diffX}px`;
        currentColumn.style.width = `${currentColumnWidth + diffX}px`;
      }
    };

    document.addEventListener('mousedown', (e) => {
      if (!e.target.dataset.resizeColumn) {
        return;
      }

      currentColumn = e.target.closest('th');
      pageX = e.pageX;
      currentColumnWidth = currentColumn.offsetWidth;

      document.addEventListener('mousemove', onMove);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMove);
      currentColumn = null;
      nextColumn = null;
      pageX = null;
      nextColumnWidth = null;
      currentColumnWidth = null;
    });
  }

  setListeners();
}
