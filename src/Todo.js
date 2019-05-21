import React, { useState, useReducer, useRef, useContext } from "react";
const TodoDispatch = React.createContext(null);
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
};

const Todo = ({ todoList = [] }) => {
  const [state, dispatch] = useReducer(reducer, { todoList });
  return (
    <TodoDispatch.Provider value={dispatch}>
      <TodoList todoList={state.todoList} />
      <AddTodoForm />
    </TodoDispatch.Provider>
  );
};

const AddTodoForm = () => {
  const dispatch = useContext(TodoDispatch);
  const [mission, setMission] = useState("");
  const inputEl = useRef(null);

  const onButtonClick = () => {
    if (!mission || mission.length <= 0) return;
    setMission("");
    dispatch({ type: "add", mission });
  };

  return (
    <div className="add-mission-wrapper">
      <input
        ref={inputEl}
        type="text"
        value={mission}
        onChange={e => setMission(e.target.value)}
      />
      <button onClick={() => onButtonClick()}>Add mission</button>
    </div>
  );
};

const TodoList = ({ todoList }) => {
  console.log(todoList);
  const dispatch = useContext(TodoDispatch);
  todoList = todoList.filter(item => item.status !== "deleted");
  return (
    <div>
      {todoList.map(todo => {
        const { id, mission, status } = todo;
        return (
          <div key={id} className="todo-item-wrapper">
            <p>Mission: {mission}</p>
            <p>Status : {status}</p>
            {status === "doing" && (
              <div>
                <button onClick={() => dispatch({ id, type: "done" })}>
                  done
                </button>
                <button onClick={() => dispatch({ id, type: "deleted" })}>
                  delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
