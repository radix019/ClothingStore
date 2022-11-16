import React from "react";
import "./actionButton.scss";

interface ActionButtonProps {
  children: string;
  ClassType?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  actionType?: "button" | "submit" | "reset" | undefined;
}
const BTN_TYPE_CLASS = {
  google: "google-sign-in",
  inverted: "inverted",
};

const ActionButton: React.FunctionComponent<ActionButtonProps> = ({
  children,
  ClassType,
  onClick,
  actionType = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={actionType}
      className={`button-container ${
        BTN_TYPE_CLASS[ClassType as keyof typeof BTN_TYPE_CLASS]
      }`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
