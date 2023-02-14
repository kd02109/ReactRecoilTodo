import { atom, selector } from "recoil";

export const fixCategory = ["TODO", "DOING", "DONE"];

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoriesState = atom<string[]>({
  key: "categoriesState",
  default: JSON.parse(
    localStorage.getItem("categories") ?? JSON.stringify(fixCategory)
  ),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});

export const categoryState = atom({
  key: "category",
  default: fixCategory[0],
});
