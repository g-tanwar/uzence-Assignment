import React, { useId, useState } from "react";
import "./InputField.css"; // 👈 apni CSS file import karna

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  showClear?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  showClear = true,
  showPasswordToggle = true,
  loading = false,
  type,
  id,
  ...rest
}) => {
  const uid = useId();
  const inputId = id ?? `input-${uid}`;
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type ?? "text";

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}

      <div
        className={`input-container ${variant} ${invalid || errorMessage ? "error" : ""} ${
          disabled ? "disabled" : ""
        } ${size}`}
      >
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="input-element"
          {...rest}
        />

        {/* loading spinner */}
        {loading && <div className="spinner" />}

        {/* clear button */}
        {!loading && showClear && !disabled && value && (
          <button
            type="button"
            onClick={() => {
              onChange?.({ target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
            aria-label="Clear input"
            className="clear-btn"
          >
            ✕
          </button>
        )}

        {/* password toggle */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="toggle-btn"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {errorMessage ? (
        <p id={`${inputId}-error`} className="error-text">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="helper-text">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
