import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { produce } from "immer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task, columnId, taskId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: taskId, data: { columnId } });
  const { setDataState, selected } = useContext(DataContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const deleteHandler = () => {
    if (window.confirm("Are you sure to delete this task ?")) {
      setDataState((prev) => {
        const newData = [...prev];
        const newColumn = prev[selected].columns.map((column) => {
          if (column?.id == columnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            };
          }
          return column;
        });
        newData[selected] = {
          ...newData[selected],
          columns: newColumn,
        };
        return newData;
      });
    }
  };
  //   ============toggleEditMode===========
  const toggleEditMode = () => {
    setIsEditMode(true);
  };
  //   ========onFocusHandler==========
  const onFocusHandler = (e) => {
    e.target.select();
  };
  const onBlurHandler = (e) => {
    setIsEditMode(false);
    const newTitle = e.target.value.trim();
    if (newTitle === task?.title) return;
    setDataState((prev) => {
      return produce(prev, (draft) => {
        const columnIndex = draft[selected].columns.findIndex(
          (col) => col.id === columnId,
        );
        const taskIndex = draft[selected].columns[columnIndex].tasks.findIndex(
          (t) => t.id === task.id,
        );
        draft[selected].columns[columnIndex].tasks[taskIndex].title = newTitle;
      });
    });
  };
  const onKeyDownHandler = (e) => {
    e.key === "Enter" && onBlurHandler(e);
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    touchAction: "none", //Prevents scrolling issues on mobile
  };

  return (
    <div>
      <div
        className="group/card relative mb-3 min-h-20 rounded-lg bg-white px-4 py-2"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        {isEditMode ? (
          <textarea
            defaultValue={task?.title}
            className="h-full w-full resize-none rounded-md p-2 outline-none focus:border-[1px] focus:border-gray-400"
            onFocus={onFocusHandler}
            autoFocus
            onBlur={onBlurHandler}
            onKeyDown={onKeyDownHandler}
          ></textarea>
        ) : (
          <button onClick={toggleEditMode} className="font-semibold">
            {task?.title}
          </button>
        )}
        <button
          onClick={deleteHandler}
          className="absolute right-0 top-0 h-full rounded-e-lg bg-red-200 px-4 py-2 text-[12px] font-bold text-red-600 opacity-0 transition-all duration-300 group-hover/card:opacity-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
