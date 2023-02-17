import * as React from "react";

interface SearchBarProps {
  valueEntered: (value: NewValue) => void;
}

export interface NewValue {
  value: string;
}

export default function SearchBar(props: SearchBarProps) {

  const [value, setValue] = React.useState("");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    startSearching(value)
  };

  const onInputPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      startSearching(value)
    }
  };

  const startSearching = (name: string) => {
    props.valueEntered({
      value: name
    })
  }

  return (
    <div>
      <label>Enter GitHub login:</label>
      <input name="login" placeholder="login" onKeyDown={onInputPressed} onChange={(e) => setValue(e.target.value)} />
      <button onClick={buttonHandler} >Search</button>
    </div>
  )
}