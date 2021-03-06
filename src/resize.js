import { saveData } from './store';

export function initResizing() {
  document.addEventListener('mousedown', (event) => {
    const { resize } = event.target.dataset;

    if (!resize) return;

    const $parent = event.target.closest('[data-type="resizable"]');
    const { offsetWidth, offsetHeight } = $parent;
    const columnId = $parent.dataset.column;
    const rowId = $parent.dataset.row;
    const selector = `[data-column="${columnId}"]`;
    const columns = document.querySelectorAll(selector);

    document.onmousemove = (e) => {
      if (resize === 'column') {
        const delta = Math.floor(e.pageX - event.pageX);
        const width = offsetWidth + delta;
        columns.forEach((cell) => {
          cell.style.width = `${width}px`;
        });
        saveData('columnState', columnId, width);
      } else if (resize === 'row') {
        const delta = Math.floor(e.pageY - event.pageY);
        const height = offsetHeight + delta;
        $parent.style.height = `${height}px`;
        saveData('rowState', rowId, height);
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}
