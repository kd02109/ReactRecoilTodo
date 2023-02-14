import { useSetRecoilState } from "recoil";
import { reLocal } from "../localStorage";
import { Categories, IToDo, toDoState } from "./atoms";
import DeletBtn from "./DeletBtn";

function Todo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
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
      {category !== Categories.DOING && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick("TO_DO")}>TO DO</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
      <DeletBtn id={id} />
    </li>
  );
}

export default Todo;
