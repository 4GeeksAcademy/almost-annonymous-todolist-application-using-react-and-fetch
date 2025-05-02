import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="container">
      <h1>My To Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTodos(todos.concat(inputValue));
                setInputValue("");
              }
            }}
            placeholder="Tasks to do today"
          ></input>
        </li>
        {todos.map((item, index) => (
          <li>
            <div className="d-flex justify-content-between">
              {item}{" "}
              <i
                class="fa-solid fa-trash"
                onClick={() =>
                  setTodos(
                    todos.filter((t, currentIndex) => index != currentIndex)
                  )
                }
              ></i>
            </div>
          </li>
        ))}
      </ul>
      <div> {todos.length} tasks</div>
    </div>
  );
};

export default Home;
