import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list,defaultValue }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={name}>Genre</InputLabel>
      <Select
        id={name}
        key={value}
        value={value}
        defaultValue= {value}
        name={name}
        label={labelText}
        onChange={handleChange}
        required
      >
        {list.map((itemValue, index) => {
          return (
            <MenuItem key={index} value={itemValue}>
              {itemValue}
            </MenuItem>
          );
        })}
      </Select>
      </FormControl>
  );
};

export default FormRowSelect;
