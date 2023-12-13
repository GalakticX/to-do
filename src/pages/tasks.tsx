import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { transferableAbortSignal } from "util";

const Tasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState("");
  const [noTasks, setNoTasks] = useState(false);
  const activeTasks = [{}];

  async function getTasksForUser() {
    const username = localStorage.getItem("username");
    try {
      const response = await fetch("/api/tasks", {
        method: "GET",
        body: username,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Normal Response:", response);
        console.log("Json Response:", response.json);
        activeTasks.push(response.json());
        return response.json;
      } else if (response.status === 404) {
        setNoTasks(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTasksForUser();
  }, []);

  return (
    <div className="absolute justify-center">
      <h1>To-Do</h1>
      {noTasks ? (
        <>
          <div className="flex snap-center">
            <div>
              <h2>You Have No Tasks</h2>
            </div>
            <div>
              <button>Create A New Task</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div>
              <h2>Your Tasks</h2>
            </div>
            <div></div>
          </div>
        </>
      )}
      <div className="container">{}</div>
    </div>
  );
};

export default Tasks;
