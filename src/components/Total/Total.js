import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import "./Total.css";
import PlusIcon from "../../assets/icons/white-plus-icon.svg";

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

const Total = ({
  totalType,
  totalAmount,
  setTotalExpenses,
  setTotalIncome,
  setIncomeTransactions,
  setExpensesTransactions,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      vendor: name,
      date: date,
      amount: parseFloat(amount),
      status: totalType === "Total Income:" ? "credited" : "debited",
    };

    const clearForm = () => {
      setName("");
      setAmount("");
      setDate("");
    };

    if (totalType === "Total Income:") {
      setIncomeTransactions((prev) => [...prev, newTransaction]);
      setTotalIncome(
        (prevTotalIncome) => parseFloat(prevTotalIncome) + parseFloat(newTransaction.amount)
      );
    } else if (totalType === "Total Expenses:") {
      setExpensesTransactions((prev) => [...prev, newTransaction]);
      setTotalExpenses(
        (prevTotalExpenses) => parseFloat(prevTotalExpenses) + parseFloat(newTransaction.amount)
      );
    }
    clearForm();
    handleClose();
  };

  return (
    <summary className="totals-container">
      <div className="totals-flex">
        <button className="add-total-button" onClick={handleOpen}>
          <img className="total-button-svg" src={PlusIcon} alt="Add" />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New {totalType === "Total Income:" ? "Income" : "Expense"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
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
        <div className="totals-text-flex">
          <p className="totals-text">{totalType}</p>
          <p className="totals-amount">${totalAmount}</p>
        </div>
      </div>
    </summary>
  );
};

export default Total;
