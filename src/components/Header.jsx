import React, { useContext, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import DropDownList from "./DropDownList";
import TheDialog from "./TheDialog";
import { DataContext } from "../context/DataContext";
import AddNewBoardForm from "./AddNewBoardForm";
import logo from "../assets/boards.png";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selected, setDataState, dataState, setSelected } =
    useContext(DataContext);

  const editFunction = () => {
    setIsOpen(true);
  };
  // =========================
  const deleteFunction = () => {
    if (window.confirm("Are you sure to delete this board ?")) {
      setDataState((prev) => {
        const newData = [...prev];
        newData.splice(selected, 1);
        setSelected(0);
        return newData;
      });
    }
  };
  return (
    <header className="bg-white py-5 shadow-md">
      <div className="container">
        <div className="flex w-full items-center justify-between">
          <div className="logo flex items-center gap-1">
            <img src={logo} className="w-6 sm:w-10" alt="logo" />
            <h1 className="text-lg font-bold md:text-3xl">Kanban</h1>
          </div>
          {/* Ellipse Icon */}
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-semibold uppercase md:text-[18px]">
              all boards ( {dataState?.length} )
            </p>
            <DropDownList
              link={
                <IoEllipsisVertical className="cursor-pointer text-lg md:text-2xl" />
              }
              items={[
                {
                  label: "Delete Board",
                  onClick: deleteFunction,
                },

                {
                  label: "Edit Board",
                  onClick: editFunction,
                },
              ]}
            />
          </div>
        </div>
        <TheDialog
          closeModal={() => setIsOpen(false)}
          isOpen={isOpen}
          title={"Edit"}
        >
          <AddNewBoardForm
            toggleButton={setIsOpen}
            boardId={dataState[selected]?.id}
            title={dataState[selected]?.title}
            columns={dataState[selected]?.columns}
          />
        </TheDialog>
      </div>
    </header>
  );
};

export default Header;
