export function trampoline(func) {
  let result = func.apply(func, ...arguments);
  while (result && typeof result === "function") {
    result = result();
  }
  return result;
}

export default trampoline;
