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
    }, 2000);
  });
};

function App() {
  const [todoList, setTodoList] = useState([])

  loadDataAsync().then((todoListFromCloud) => {
    setTodoList(todoListFromCloud)
  })

  return (
    <div className="App">
      {todoList.length > 0 && <Todo todoList={todoList}/>}
    </div>
  );
}

export default App;
