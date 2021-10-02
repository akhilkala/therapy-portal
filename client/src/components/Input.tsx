import cn from "classnames";
import React, { ReactElement } from "react";

interface Props {
  state: {
    value: string;
    handleChange: (e: any) => void;
    handleReset: () => void;
  };
  type?: string;
  placeholder: string;
  className?: string;
  icon?: ReactElement;
  underline?: boolean;
  label?: string;
}

export default function Input({
  state,
  type,
  placeholder,
  className = "",
  icon,
  underline,
  label,
}: Props): ReactElement {
  const [seen, setSeen] = React.useState(false);

  return (
    <div>
      {!!label && (
        <label htmlFor={label} className="input-label">
          {label}
        </label>
      )}
      <div
        className={cn("input-container", {
          "input-container--underline": underline,
        })}
      >
        {type === "password" && !seen && (
          <i onClick={() => setSeen(true)} className="fas fa-eye-slash"></i>
        )}
        {type === "password" && seen && (
          <i onClick={() => setSeen(false)} className="fas fa-eye"></i>
        )}
        {!!icon && icon}
        <input
          id={label}
          autoComplete="off"
          value={state.value}
          onChange={state.handleChange}
          type={!seen ? (type ? type : "text") : "text"}
          placeholder={placeholder}
          className={cn("input-field", className, {
            "input-field--underline": underline,
          })}
        />
      </div>
    </div>
  );
}
