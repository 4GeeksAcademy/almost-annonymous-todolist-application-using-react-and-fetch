import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(()=>{
      fetch("https://playground.4geeks.com/todo/users/almost-annonymous", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          setTodos(body.todos);
        });
    },[])
  // Add a new task
  const addTask = () => {
    const newTask = {
      label: inputValue.trim(),
      is_done: false,
    };
    fetch("https://playground.4geeks.com/todo/todos/almost-annonymous", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then(() => {
        setInputValue("");
        // Refresh task list
        return fetch("https://playground.4geeks.com/todo/users/almost-annonymous", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));
  };

  // Delete a task
  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() =>
        fetch("https://playground.4geeks.com/todo/users/almost-annonymous", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      )
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));
  };

  // Clear all tasks
  const clearAllTasks = () => {
    const deletePromises = todos.map((task) =>
      fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    Promise.all(deletePromises).then(() => {
      // Refresh task list
      fetch("https://playground.4geeks.com/todo/users/almost-annonymous", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setTodos(data.todos));
    });
  };

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
              if (e.key === "Enter" && inputValue.trim() !== "") {
                addTask();
              }              
            }}
            placeholder="Tasks to do today"
          ></input>
        </li>
        {todos.map((item, index) => (
          <li key={item.id}>
            <div className="d-flex justify-content-between">
              {item.label}{" "}
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteTask(item.id)
                }
              ></i>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between mt-3"> {todos.length} tasks
        <button className="btn btn-danger" onClick={clearAllTasks}> Clear All Tasks </button>
      </div>
    </div>
  );
};

export default Home;
