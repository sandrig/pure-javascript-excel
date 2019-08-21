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
