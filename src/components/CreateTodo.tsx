import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reLocal } from "../localStorage";
import { toDoState, categoryState } from "./atoms";
import { Btn, Form, Input } from "./styledTag";

interface IForm {
  toDo: string;
}

function CreateTodo() {
  const toDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    reLocal([{ text: toDo, id: Date.now(), category }, ...toDos] as any);
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <Btn>Add</Btn>
    </Form>
  );
}

export default CreateTodo;
