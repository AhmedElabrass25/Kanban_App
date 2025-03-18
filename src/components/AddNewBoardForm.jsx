import React, { useContext, useState } from "react";
import TextFeiled from "./TextFeiled";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { DataContext } from "../context/DataContext";

const AddNewBoardForm = ({
  boardId,
  toggleButton,
  title,
  columns = [{ id: Date.now() }],
}) => {
  const { setDataState, setSelected } = useContext(DataContext);
  const [arrayColumns, setArrayColumns] = useState(columns);
  const removeColumn = (id) => {
    const newArrayColumn = arrayColumns.filter((col) => col.id !== id);
    setArrayColumns(newArrayColumn);
  };
  const addNewColumn = () => {
    setArrayColumns((prev) => [...prev, { id: Date.now() }]);
  };
  // ==========Create New Columns Array===========
  const createNewColumnsArray = (formData, arrayColumns, boardId) => {
    return arrayColumns.map((col) => {
      const taskArray = boardId ? col?.tasks : [];
      return {
        id: col?.id,
        title: formData.get(col?.id),
        tasks: taskArray,
      };
    });
  };
  // ==========Update Data===========
  const updateData = (boardName, newColumnArray, boardId) => {
    setDataState((prev) => {
      let newData;
      if (boardId) {
        newData = prev.map((item) => {
          if (item?.id === boardId) {
            return { ...item, title: boardName, columns: newColumnArray };
          }
          return item;
        });
      } else {
        newData = [
          ...prev,
          {
            id: Date.now(),
            title: boardName,
            columns: newColumnArray,
          },
        ];
        setSelected(prev.length);
      }
      return newData;
    });
    toggleButton(false);
  };
  // ==========Handle Create Board===========
  const handleCreateBoard = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const boardName = formData.get("boardName");
    const newColumnArray = createNewColumnsArray(
      formData,
      arrayColumns,
      boardId,
    );
    updateData(boardName, newColumnArray, boardId);
  };
  return (
    <form
      onSubmit={handleCreateBoard}
      className="max-h-[600px] w-full overflow-y-auto rounded-md bg-white p-4"
    >
      <div className="my-4">
        <p className="mb-1 text-gray-600">Name</p>
        <TextFeiled
          required
          defaultValue={title}
          placeholder={"e.g web"}
          className="w-full"
          name="boardName"
        />
      </div>
      <div className="my-2">
        <p className="mb-1 text-gray-600">columns</p>
        {arrayColumns.map((col) => {
          return (
            <div
              key={col.id}
              className="mb-3 flex items-center justify-between gap-3"
            >
              <TextFeiled
                required
                defaultValue={col.title}
                name={col.id}
                placeholder={"e.g web"}
                className="w-full"
              />
              <IoMdClose
                onClick={() => removeColumn(col.id)}
                className="cursor-pointer text-xl font-bold text-gray-500"
              />
            </div>
          );
        })}
        <Button
          type="button"
          variant={"secondary"}
          size={"sm"}
          className={"my-6 w-full"}
          onClick={addNewColumn}
        >
          {" "}
          + Add new column{" "}
        </Button>
      </div>
      <Button
        type="submit"
        variant={"primary"}
        size={"sm"}
        className={"w-full"}
      >
        {" "}
        {boardId ? "Edit New Board" : "Create New Board"}{" "}
      </Button>
    </form>
  );
};

export default AddNewBoardForm;
