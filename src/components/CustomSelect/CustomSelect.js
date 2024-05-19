// src/components/CustomSelect/AddressSelect.js
import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';

const CustomSelect = ({ options, value, inputLabel, onChange, valueKey, labelKey }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{inputLabel}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option[valueKey]} value={option[labelKey]}>
            {`${option[valueKey]} - ${option[labelKey]}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
