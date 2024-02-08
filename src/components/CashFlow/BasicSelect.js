import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect() {
  const [year, setYear] = React.useState("");

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#AFA0FF",
            },
            "&:hover fieldset": {
              borderColor: "#AFA0FF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#AFA0FF",
            },
          },
          ".MuiInputLabel-root": {
            color: "#8C89B4",
            "&.Mui-focused": {
              color: "#AFA0FF",
            },
          },
          ".MuiSelect-select": {
            color: "#FFF",
          },
        }}
      >
        <InputLabel
          id="demo-simple-select-label"
          sx={{ color: "#8C89B4", "&.Mui-focused": { color: "#AFA0FF" } }}
        >
          Year
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          placeholder="Year"
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#AFA0FF",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#AFA0FF",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#AFA0FF",
            },
            ".MuiSelect-select": {
              color: "#FFF",
            },
            backgroundColor: "#1D1D41",
          }}
        >
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
