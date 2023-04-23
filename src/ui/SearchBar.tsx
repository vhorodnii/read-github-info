import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import * as React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";

interface SearchBarProps {
  valueEntered: (value: NewValue) => void;
}

export interface NewValue {
  value: string;
}

export default function SearchBar(props: SearchBarProps) {

  const [value, setValue] = useState("");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerEvent(value)
  };

  const onInputPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      triggerEvent(value)
    }
  };

  const triggerEvent = (name: string) => {
    props.valueEntered({
      value: name
    })
  }

  const SearchButton = () => (
    <IconButton onClick={buttonHandler}>
      <SearchIcon />
    </IconButton>
  )

  return (
    <TextField
      id="login"
      label="Enter GitHub login:"
      variant="outlined"
      onKeyDown={onInputPressed}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{ endAdornment: <SearchButton /> }} />
  )
}