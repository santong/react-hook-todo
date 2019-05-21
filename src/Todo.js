import React, { useState, useReducer, useRef } from "react";

/**
 * todo:
 *  id: Date.now()
 *  mission: string
 *  status: doing / done / deleted
 */

const reducer = (state, action) => {
  const todoList = state.todoList;
  const { type } = action;

  if (type === "add") {
    const id = Date.now();
    todoList.push({
      id,
      mission: action.mission,
      status: "doing"
    });
  } else if (type === "done" || type === "deleted") {
    const todo = todoList.find(item => item.id === action.id);
    todo.status = type;
  }

  return { ...state, todoList };
}

const Todo = ({ todoList  = [] }) => {
  const [mission, setMission] = useState("");
  const [state, dispatch] = useReducer(reducer, { todoList });
  const inputEl = useRef(null);

  const onButtonClick = () => {
    if (!mission || mission.length <= 0) return;
    setMission("");
    dispatch({ type: "add", mission });
  };

  return (
    <div>
      {TodoList(state, dispatch)}
      <div className="add-mission-wrapper">
        <input
          ref={inputEl}
          type="text"
          value={mission}
          onChange={e => setMission(e.target.value)}
        />
        <button onClick={() => onButtonClick()}>Add mission</button>
      </div>
    </div>
  );
}


const TodoList = (state, dispatch) => {
  let todoList = state.todoList;
  todoList = todoList.filter(item => item.status !== "deleted");
  return (
    <>
      {todoList.map(todo => {
        return (
          <div key={todo.id} className="todo-item-wrapper">
            <p>Mission: {todo.mission}</p>
            <p>Status : {todo.status}</p>
            {todo.status === "doing" && (
              <>
                <button onClick={() => dispatch({ id: todo.id, type: "done" })}>
                  done
                </button>
                <button
                  onClick={() => dispatch({ id: todo.id, type: "deleted" })}
                >
                  delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default Todo;
