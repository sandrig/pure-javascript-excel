function checkState(value) {
  return localStorage.getItem(value)
    ? JSON.parse(localStorage.getItem(value))
    : {};
}

export function saveStateValue(name, key, value) {
  const state = checkState(name);
  state[key] = value;
  localStorage.setItem(name, JSON.stringify(state));
}

export function getStateValue(name, index, defaultValue = '') {
  const state = checkState(name);
  return state[index] ? state[index] : defaultValue;
}
