import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  toDoSelector,
  categoryState,
  toDoState,
  categoriesState,
} from "./atoms";
import CreateTodo from "./CreateTodo";
import { Btn, Form, Input } from "./styledTag";
import Todo from "./Todo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const TodoBox = styled.div`
  height: 50vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const TitleBox = styled.div`
  margin-top: 20px;
  h1 {
    font-size: 58px;
    font-weight: 900;
    color: rgb(0, 151, 230);
    margin-bottom: 20px;
  }
  hr {
    height: 1px;
    background: rgb(0, 168, 255);
  }
`;

const Select = styled.select`
  margin: 10px 0px;
  width: 20%;
  padding: 5px 20px;
  border-radius: 10px;
  border: none;
`;

function ToDoList() {
  const setToDos = useSetRecoilState(toDoState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data: any) => {
    const newCategory = data.addCategory;
    setValue("addCategory", "");
    if (categories.includes(newCategory)) {
      alert("같은 이름의 카테고리가 이미 있어서 추가할 수 없습니다.");
      return;
    }

    setCategories([...categories, newCategory]);
    setCategory(newCategory);
  };

  useEffect(() => {
    const localToDoList = localStorage.getItem("TODOS_KEY");
    if (localToDoList) {
      setToDos(JSON.parse(localToDoList));
    }
  }, [setToDos]);

  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <Container>
      <TitleBox>
        <h1>To Dos</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("addCategory", { required: "Plz Write a Text" })}
            placeholder="Add a category"
          />
          <Btn>Add</Btn>
        </Form>
        <hr />
      </TitleBox>

      <Select value={category} onInput={onInput}>
        {categories.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </Select>
      <CreateTodo />
      <br />
      <TodoBox>
        {todos?.map((toDo) => (
          <Todo key={toDo.id} {...toDo} />
        ))}
      </TodoBox>
    </Container>
  );
}

export default ToDoList;
