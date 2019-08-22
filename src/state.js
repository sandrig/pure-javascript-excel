export function saveState(name, key, value) {
  const state = localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : {};
  state[key] = value;
  localStorage.setItem(name, JSON.stringify(state));
}

export function getState(name, index, defaultValue) {
  const state = localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : {};
  return state[index] ? state[index] : defaultValue;
}

export function saveContentCell(id, value) {
  const state = localStorage.getItem(id)
    ? JSON.parse(localStorage.getItem(id))
    : {};
  state[id] = value;
  localStorage.setItem(id, JSON.stringify(state));
}

export function getContentCell(id) {
  const state = localStorage.getItem(id)
    ? JSON.parse(localStorage.getItem(id))
    : {};
  return state[id] ? state[id] : '';
}
