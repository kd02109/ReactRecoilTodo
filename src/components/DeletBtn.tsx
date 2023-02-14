import { useSetRecoilState } from "recoil";
import { reLocal } from "../localStorage";
import { IToDo, toDoState } from "./atoms";

interface IDeletBtn {
  id: number;
}

function DeletBtn({ id }: IDeletBtn) {
  const setTodo = useSetRecoilState(toDoState);
  const onClick = (id: IToDo["id"]) => {
    setTodo((oldTodo) => {
      const newTodo = oldTodo.filter((todo) => todo.id !== id);
      reLocal(newTodo as any);
      return newTodo;
    });
  };
  return <button onClick={() => onClick(id)}>❌</button>;
}

export default DeletBtn;
