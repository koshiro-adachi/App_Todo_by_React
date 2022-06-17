import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./compornents/inputTodo";
import { IncompleteTodos } from "./compornents/incompleteTodos";
import { CompleteTodo } from "./compornents/completeTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  const onClickAddComplete = (index) => {
    const completeNewTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(completeNewTodos);
    const incompleteNewTodos = [...incompleteTodos];
    incompleteNewTodos.splice(index, 1);
    setIncompleteTodos(incompleteNewTodos);
  };
  const onClickBack = (index) => {
    const completeNewTodos = [...completeTodos];
    completeNewTodos.splice(index, 1);
    setCompleteTodos(completeNewTodos);
    const incompleteNewTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(incompleteNewTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && <p>登録できるtodoは5個まで!!</p>}
      <IncompleteTodos
        todo={incompleteTodos}
        onClickAddComplete={onClickAddComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todo={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
