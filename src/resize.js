import { saveState } from './state';

export function initResizing() {
  document.addEventListener('mousedown', (event) => {
    const { resize } = event.target.dataset;

    if (!resize) {
      return;
    }

    const $parent = event.target.closest('[data-type="resizible"]');
    const { offsetWidth, offsetHeight } = $parent;

    document.onmousemove = (e) => {
      if (resize === 'column') {
        const columnId = $parent.dataset.column;
        const selector = `[data-column="${columnId}"]`;
        const delta = Math.floor(e.pageX - event.pageX);
        const width = offsetWidth + delta;
        const columns = Array.from(document.querySelectorAll(selector));
        columns.forEach((cell) => {
          const el = cell;
          el.style.width = `${width}px`;
          return el;
        });
        saveState('columnState', columnId, width);
      } else if (resize === 'row') {
        const rowId = $parent.dataset.row;
        const delta = Math.floor(e.pageY - event.pageY);
        const height = offsetHeight + delta;
        $parent.style.height = `${height}px`;
        saveState('rowState', rowId, height);
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}
