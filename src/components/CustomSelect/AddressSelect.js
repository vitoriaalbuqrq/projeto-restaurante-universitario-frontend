// AddressSelectEdit.js
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

const AddressSelect = ({ value, onChange, addresses }) => {
  const [selectedAddress, setSelectedAddress] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedAddress(newValue);
    onChange(newValue); 
  };

  return (
    <FormControl>
      <InputLabel htmlFor="address-select">Endereço</InputLabel>
      <Select
        value={selectedAddress}
        onChange={handleChange}
        inputProps={{
          name: 'address',
          id: 'address-select',
        }}
      >
        {addresses.map((address, index) => (
          <MenuItem key={index} value={address}>
            {address}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Selecione um endereço</FormHelperText>
    </FormControl>
  );
};

export default AddressSelect;
