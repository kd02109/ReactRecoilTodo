import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { reLocal } from "../localStorage";
import { categoriesState, IToDo, toDoState } from "./atoms";
import DeletBtn from "./DeletBtn";
import { BtnTodo } from "./styledTag";

const Container = styled.div`
  background-color: rgba(53, 59, 72, 0.5);
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px auto;
  border-radius: 20px;
  span {
    font-size: 28px;
    color: rgba(245, 246, 250, 1);
    font-weight: 600;
    margin-bottom: 13px;
  }
`;
const BtnBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
`;

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
    <Container>
      <span>{text}</span>
      <BtnBox>
        {categories.map(
          (item) =>
            category !== item && (
              <BtnTodo onClick={() => onClick(item)}>{item}</BtnTodo>
            )
        )}
        <DeletBtn id={id} />
      </BtnBox>
    </Container>
  );
}

export default Todo;
