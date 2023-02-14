export const reLocal = (list: []) => {
  localStorage.setItem("TODOS_KEY", JSON.stringify(list));
};
