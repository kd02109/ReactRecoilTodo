import { useRecoilValue, useSetRecoilState } from "recoil";
import { reLocal } from "../localStorage";
import { categoriesState, IToDo, toDoState } from "./atoms";
import DeletBtn from "./DeletBtn";

function Todo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (newCategory: IToDo["category"]) => {
    console.log("i wanna to go", newCategory);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newTodo = { text, category: newCategory, id };
      const newTodos = [
        ...oldToDos.slice(0, targetIndex),
        newTodo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      reLocal(newTodos as any);
      return newTodos;
    });
  };
  return (
    <li>
      {text}
      <div>
        {categories.map(
          (item) =>
            category !== item && (
              <button onClick={() => onClick(item)}>{item}</button>
            )
        )}
        <DeletBtn id={id} />
      </div>
    </li>
  );
}

export default Todo;
