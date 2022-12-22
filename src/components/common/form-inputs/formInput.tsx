import React from "react";
import "./formInput.scss";
interface FormInputProps {
  label: string;
  name: string;
  type: string;
  required: boolean;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput: React.FunctionComponent<FormInputProps> = ({
  label,
  ...otherInputs
}) => {
  return (
    <div className="group">
      <input className="form-input" {...otherInputs} />
      {label && (
        <label
          className={`${
            otherInputs.value?.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
