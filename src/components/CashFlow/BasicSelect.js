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
              borderColor: "#AFA0FF", // Your desired border color for the fieldset
            },
            "&:hover fieldset": {
              borderColor: "#AFA0FF", // Example hover color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#AFA0FF", // Example focus color
            },
          },
          ".MuiInputLabel-root": {
            color: "#8C89B4", // Adjust label color as needed
            "&.Mui-focused": {
              color: "#AFA0FF", // Adjust focused label color as needed
            },
          },
          ".MuiSelect-select": {
            color: "#FFF", // Adjust select text color as needed
          },
        }}
      >
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          onChange={handleChange}
        >
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
