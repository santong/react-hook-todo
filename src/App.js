import React, { useState } from "react";

import Todo from "./Todo";

const MOCK_DATA = [
  {
    id: 1000,
    mission: "测试 useState",
    status: "done"
  },
  {
    id: 1001,
    mission: "测试 useReducer",
    status: "doing"
  },
  {
    id: 1002,
    mission: "测试 useRef",
    status: "doing"
  },
  {
    id: 1003,
    mission: "测试 useEffect",
    status: "doing"
  }
];

const loadDataAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1000);
  });
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isFinish, setIsFinish] = useState(false);

  loadDataAsync()
    .then(todoListFromCloud => {
      setTodoList(todoListFromCloud);
      setIsFinish(true);
    })
    .catch(e => {
      setIsFinish(true);
    });

  return <div className="App"> {isFinish && <Todo todoList={todoList} />}</div>;
}

export default App;
