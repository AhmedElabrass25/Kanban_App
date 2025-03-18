import React from "react";
import { cva } from "class-variance-authority";
const button = cva(
  ["font-bold", "duration-200", "rounded-full", "px-6", "text-[14px]"],
  {
    variants: {
      variant: {
        primary: ["bg-purple-700", "text-white", "hover:bg-purple-300"],
        secondary: [
          "bg-gray-100",
          "text-purple-700",
          "bg-purple-700/20",
          "hover:bg-purple-700/35",
        ],
        destructive: ["bg-red-600", "text-white", "hover:bg-red-300"],
      },
      size: {
        sm: ["h-10"],
        lg: ["h-12"],
      },
      // `boolean` variants are also supported!
      isDisabled: {
        false: null,
        true: ["opacity-50", "cursor-not-allowed"],
      },
      isFullWidth: {
        false: null,
        true: ["w-full"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);
const Button = ({
  children,
  variant,
  size,
  isDisabled,
  isFullWidth,
  className,
  ...props
}) => {
  return (
    <>
      <button
        className={button({
          variant,
          size,
          isDisabled,
          isFullWidth,
          className,
        })}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
