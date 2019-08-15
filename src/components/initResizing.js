export function initResizing() {
  const row = document.getElementById('row-head');
  const cols = row ? row.children : undefined;
  if (!cols) return;

  function setListeners() {
    let pageX;
    let curCol;
    let nxtCol;
    let curColWidth;
    let nxtColWidth;

    const onMove = (e) => {
      if (curCol) {
        const diffX = e.pageX - pageX;
        if (nxtCol) nxtCol.style.width = `${nxtColWidth - diffX}px`;
        curCol.style.width = `${curColWidth + diffX}px`;
      }
    };

    document.addEventListener('mousedown', (e) => {
      if (!e.target.dataset.resize) {
        return;
      }

      curCol = e.target.closest('th');
      pageX = e.pageX;
      curColWidth = curCol.offsetWidth;

      document.addEventListener('mousemove', onMove);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMove);
      curCol = null;
      nxtCol = null;
      pageX = null;
      nxtColWidth = null;
      curColWidth = null;
    });
  }

  setListeners();
}
