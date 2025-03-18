import React from "react";

const TextFeiled = ({
  placeholder,
  required,
  name,
  isInvalid,
  defaultValue,
  type,
}) => {
  return (
    <>
      <div className="relative flex flex-1 items-center">
        {isInvalid && <span className="absolute right-4">can`t be empty</span>}
        <input
          type="text"
          name={name}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`text-bold w-full rounded-[5px] border border-gray-500/25 py-2 pl-4 text-black ${isInvalid ? "border-red-500 pr-32" : "pr-4"} `}
        />
      </div>
    </>
  );
};

export default TextFeiled;
