import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskDetails from "./components/TaskDetails";
import Tasks from "./components/Tasks";

import "./components/GlobalStyle.css";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
      );
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed };

      return task;
    });

    setTasks(newTasks);
  };

  const handleTaskAddition = (taskTitle) => {
    if (taskTitle !== "") {
      const newTasks = [
        ...tasks,
        {
          id: uuidv4(),
          title: taskTitle,
          completed: false,
        },
      ];

      setTasks(newTasks);
    } else {
      toast.error("OPA, TAREFA SEM NOME!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskDeletion={handleTaskDeletion}
                />
                <ToastContainer />
              </>
            }
          />

          <Route path="/:taskTitle" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
