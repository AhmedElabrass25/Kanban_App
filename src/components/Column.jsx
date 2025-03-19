import React, { useContext } from "react";
import Task from "./Task";
import { DataContext } from "../context/DataContext";
import { produce } from "immer";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ column, id }) => {
  const { selected, setDataState } = useContext(DataContext);
  const createNewTask = () => {
    return { id: Date.now(), title: "newTitle" };
  };
  // =======Add New Task===========
  const addNewTask = () => {
    const newTask = createNewTask();
    setDataState((prev) =>
      produce(prev, (draft) => {
        const columnIndex = draft[selected].columns.findIndex(
          (col) => col.id === id,
        );
        if (columnIndex !== -1) {
          draft[selected].columns[columnIndex].tasks.push(newTask);
        }
      }),
    );
  };
  // =======Delete Column Handler===========
  const deleteColumnHandler = () => {
    if (window.confirm(`Are you sure to delete this column ${column?.title}`)) {
      setDataState((prev) =>
        produce(prev, (draft) => {
          draft[selected].columns = draft[selected].columns.filter(
            (col) => col.id !== id,
          );
        }),
      );
    }
  };
  // =======To Drag task in empty column===========
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  });

  return (
    <div
      ref={setNodeRef}
      className={`group/col relative mb-5 w-full rounded-lg bg-gray-300 px-6 py-4 sm:w-[48%] md:w-[32%]`}
    >
      <button
        onClick={deleteColumnHandler}
        className="absolute right-[10px] top-[10px] text-[15px] font-bold text-red-700 opacity-0 transition-all duration-300 group-hover/col:opacity-100"
      >
        Delete
      </button>
      <h1 className="mb-2 font-bold">
        {column?.title} ( {column?.tasks?.length} )
      </h1>
      <div className="tasks">
        {Array.isArray(column?.tasks) ? (
          column.tasks.map((task) => (
            <Task task={task} key={task.id} taskId={task.id} columnId={id} />
          ))
        ) : (
          <div className="empty-column">Drop Here</div>
        )}
      </div>
      <div className="line mb-3 h-[2px] w-full bg-gray-200"></div>
      <button
        className="w-full text-center font-semibold text-gray-700"
        onClick={addNewTask}
      >
        + Add new task
      </button>
    </div>
  );
};

export default Column;
