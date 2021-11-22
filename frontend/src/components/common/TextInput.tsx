import React, { useState } from "react";
import { TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  type: "text" | "password";
  isRequired?: boolean;
  isFullWidth?: boolean;
}

export default function TextInput(props: TextInputProps) {
  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <TextField
      value={value}
      onChange={handleChange}
      required={props.isRequired}
      label={props.label}
      type={props.type}
      fullWidth={props.isFullWidth}
      autoComplete="off"
    />
  );
}
