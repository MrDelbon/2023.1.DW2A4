import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskDetails from "./components/TaskDetails";
import Tasks from "./components/Tasks";

import "./components/GlobalStyle.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
		const fetchTasks = async () => {
			const {data} = await axios.get("https://jsonplaceholder.cypress.io/todos?_limit=10");
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
    if (taskTitle !== ""){
        const newTasks = [...tasks, {
          id: uuidv4(),
          title: taskTitle,
          completed: false,
        },
      ];

      setTasks(newTasks);
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
          <Route path="/" element={(
            <>
              <AddTask handleTaskAddition={handleTaskAddition}/>
              <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskDeletion={handleTaskDeletion}/>
            </>
          )}/>

          <Route path="/:taskTitle" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;