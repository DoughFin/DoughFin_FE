import React, { useState } from 'react'
import './AddIncome.css'
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import PlusIcon from "../../assets/icons/white-plus-icon.svg";
import { useCreateIncome } from "../apollo-client/mutations/createIncome";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: "90%",
  bgcolor: "#1D1D41",
  border: "none",
  borderRadius: "10px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
  p: 4,
  color: "#FFF",
};

const AddIncome = ({ totalIncome, setTotalIncome, setTransactions }) => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Bilbo's UID
  const userId = "2"

  const { createIncome } = useCreateIncome();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountCents = Math.round(parseFloat(amount) * 100);

    try {
      const { data } = await createIncome({
        variables: {
          userId,
          source,
          amount: amountCents,
          date,
        },
      });
      
      const newTransaction = {
        id: data.createIncome.id,
        vendor: source,
        date,
        amount: amountCents,
        status: "credited",
      };
  
      setTransactions(prev => [...prev, newTransaction]);
      setTotalIncome(prevTotalIncome => prevTotalIncome + amountCents);

      setSource("");
      setAmount("");
      setDate("");

      handleClose();
    } catch (error) {
      console.error("Error creating income: ", error);
    }
  };

  return (
    <summary className="add-transx-container">
      <div className="add-transx-flex">
      <button className="add-transx-button" onClick={handleOpen}>
          <img className="transx-button-svg" src={PlusIcon} alt="Add Transaction" />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Income
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="source"
                label="Source"
                name="source"
                autoFocus
                value={source}
                onChange={(e) => setSource(e.target.value)}
                sx={{
                  "& label.Mui-focused": {
                    color: "#AFA0FF",
                  },
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
                    input: {
                      color: "#FFF",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#8C89B4",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="date"
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{
                  "& label.Mui-focused": {
                    color: "#AFA0FF",
                  },
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
                    input: {
                      color: "#FFF",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#8C89B4",
                  },
                }}
              />
              <TextField
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{
                  "& label.Mui-focused": {
                    color: "#AFA0FF",
                  },
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
                    input: {
                      color: "#FFF",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#8C89B4",
                  },
                }}
                placeholder="Enter amount (e.g., 50.00)"
                label="Amount"
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#6359E9",
                  "&:hover": {
                    backgroundColor: "#5048B3",
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
        <div className="transx-text-flex">
          <p className="transx-text">Total Income:</p>
          <p className="transx-amount">
            {(totalIncome / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </p>
        </div>
      </div>
    </summary>
  )
}

export default AddIncome