import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface WithdrawalFormProps {
  initialBalance: number;
}

export function WithdrawalForm({ initialBalance }: WithdrawalFormProps) {
  const [balance, setBalance] = useState(initialBalance);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [error, setError] = useState("");
  const notes = [20, 10, 5];
  const notesAvailable: { [key: number]: number } = {
    20: 7,
    10: 15,
    5: 4,
  };

  const handleWithdrawalAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWithdrawalAmount(event.target.value);
  };

  const handleWithdrawal = () => {
    var amount = Number(withdrawalAmount);

    if (isNaN(amount) || amount <= 0) {
      setError("Invalid withdrawal amount.");
      return;
    }

    if (amount > balance + 100) {
      setError(
        "Withdrawal amount exceeds available balance and overdraft limit."
      );
      return;
    }

    const notesToDispense: number[] = [];

    for (const note of notes) {
     const numNotes = Math.min(Math.floor(amount / note), notesAvailable[note]);
     notesAvailable[note] -= numNotes;
     notesToDispense.push(...Array(numNotes).fill(note));
     const noteValue = numNotes * note; // Calculate the value of the notes being dispensed
     amount -= noteValue;
     if (amount === 0) break;
    }

    if (amount > 0) {
      setError("Unable to dispense requested amount with available notes.");
      return;
    }

    setBalance((prevBalance) => prevBalance - Number(withdrawalAmount)); // Adjust balance here
    setWithdrawalAmount("");
    setError("");
  };

  return (
		<form
				onClick={handleWithdrawal}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
			<Typography variant="h6">Current Balance: £{balance}</Typography>
			<TextField
				type="number"
				label="Withdrawal Amount"
				variant="outlined"
				value={withdrawalAmount}
				onChange={handleWithdrawalAmountChange}
				error={!!error}
				helperText={error}
				style={{ marginBottom: '10px', width: '300px' }}
				inputProps={{ style: { height: '40px', fontSize: '18px' } }}
			/>
			<Button type="submit" variant="contained" color="primary">
				Withdraw
			</Button>
		</form>
	);
}
