import React, { useContext, useMemo } from "react";
import Column from "./Column";
import { DataContext } from "../context/DataContext";
import { produce } from "immer";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const WorkSpace = ({ columns = [] }) => {
  const { selected, setDataState, dataState } = useContext(DataContext);
  // ================Add New Column=============
  const addNewColumn = () => {
    setDataState((prev) => {
      const newData = produce(prev, (draft) => {
        draft[selected].columns.push({
          id: Date.now(),
          title: "New Column",
          tasks: [],
        });
      });
      return newData;
    });
  };
  // ================Sensor=============
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 5 }, // 🔥 Ensures instant activation
      pressDelay: 0, // 🔥 No delay for better responsiveness
      pressThreshold: 5, // 🔥 Small movement to detect drag
    }), // For mobile touch
  );
  // ================Handle Drag End=============
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // Prevent crashing when dropping outside
    const activeId = active.id;
    const overColumnId = over.data.current?.columnId;
    const activeColumnId = active.data.current?.columnId;
    const overId = over.id;
    if (activeId === overId) return;
    if (activeColumnId === overColumnId) {
      const newColumn = columns.map((col) => {
        if (col.id === activeColumnId) {
          const activeIdIndex = col.tasks.findIndex(
            (task) => task.id === activeId,
          );
          const overIdIndex = col.tasks.findIndex((task) => task.id === overId);
          if (activeIdIndex !== -1 && overIdIndex !== -1) {
            const tasks = arrayMove(col.tasks, activeIdIndex, overIdIndex);
            return { ...col, tasks };
          }
        }
        return col;
      });
      setDataState((prev) =>
        produce(prev, (draft) => {
          draft[selected].columns = newColumn;
        }),
      );
    }
  };
  // ================useMemo=============
  const tasksIds = useMemo(() => {
    return Array.isArray(columns)
      ? columns.flatMap((column) => column.tasks.map((task) => task.id))
      : [];
  }, [columns]);
  // ==============Handle Drag Over===================
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over || !active) return; // Prevents errors when dropping outside
    const activeId = active.id;
    const overColumnId = over?.data?.current?.columnId;
    const activeColumnId = active?.data?.current?.columnId;
    // =================================================
    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId)
      return;
    if (activeColumnId !== overColumnId) {
      const newColumns = columns.map((column) => {
        if (column?.id === overColumnId) {
          const activeTask = columns
            .find((column) => column.id == activeColumnId)
            .tasks.find((task) => task?.id === activeId);
          const tasks = [...column.tasks, activeTask];
          return { ...column, tasks };
        }
        // =============================================
        if (column?.id === activeColumnId) {
          const tasks = column.tasks.filter((task) => task.id !== activeId);
          return { ...column, tasks };
        }
        return column;
      });
      setDataState((prev) =>
        produce(prev, (draft) => {
          draft[selected].columns = newColumns;
        }),
      );
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <section className="mt-16">
        <div className="container">
          <div className="flex w-full flex-wrap items-start justify-between">
            <SortableContext
              items={tasksIds}
              strategy={verticalListSortingStrategy}
            >
              {columns?.map((item) => (
                <Column key={item?.id} column={item} id={item?.id} />
              ))}
            </SortableContext>
            {dataState?.length > 0 && (
              <button
                onClick={addNewColumn}
                className="mb-5 rounded-lg bg-gray-300 px-5 py-2 font-semibold text-gray-700"
              >
                + New Column
              </button>
            )}
          </div>
        </div>
      </section>
    </DndContext>
  );
};

export default WorkSpace;
