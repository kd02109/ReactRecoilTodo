import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  toDoSelector,
  categoryState,
  toDoState,
  fixCategory,
  categoriesState,
} from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

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
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("addCategory", { required: "Plz Write a Text" })}
          placeholder="Add a category"
        />
        <button>Add</button>
      </form>
      <select value={category} onInput={onInput}>
        {categories.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <CreateTodo />
      {todos?.map((toDo) => (
        <Todo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
