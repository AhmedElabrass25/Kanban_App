import React, { useContext, useState } from "react";
import Button from "./Button";
import { BsJournalBookmark } from "react-icons/bs";
import TheDialog from "./TheDialog";
import { DataContext } from "../context/DataContext";
import AddNewBoardForm from "./AddNewBoardForm";

const TheDrawar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dataState, setSelected, selected } = useContext(DataContext);
  return (
    <section className="mt-5">
      <div className="container">
        <div className="flex w-full flex-wrap items-center justify-between">
          <ul className="list flex items-center gap-3">
            {dataState &&
              dataState?.map((item, index) => {
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setSelected(index)}
                      className={`mb-3 flex items-center gap-3 rounded-full bg-gray-100 px-6 py-3 font-semibold text-purple-700 ${selected == index ? "bg-purple-600 text-white hover:bg-none" : "hover:bg-purple-700/35"}`}
                    >
                      <BsJournalBookmark />
                      {item.title}
                    </button>
                  </li>
                );
              })}
          </ul>
          <div className="createNewBoard">
            <Button
              onClick={() => setIsOpen(true)}
              variant="secondary"
              className={"border-[1px] border-slate-100 shadow-sm"}
              size="sm"
              isFullWidth
            >
              + create new board
            </Button>
          </div>
          <TheDialog
            closeModal={() => setIsOpen(false)}
            isOpen={isOpen}
            title={"Create new board"}
          >
            <AddNewBoardForm toggleButton={setIsOpen} />
          </TheDialog>
        </div>
      </div>
    </section>
  );
};

export default TheDrawar;
