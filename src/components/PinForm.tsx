import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { processApiRequest } from "../lib/api";

interface PinFormProps {
  onSuccessfulPin: () => void;
}

export function PinForm({ onSuccessfulPin }: PinFormProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPin(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await processApiRequest(pin);
      setError("");
      onSuccessfulPin();
    } catch (error) {
      setError("Incorrect PIN. Please try again.");
    }
  };


   return (
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<TextField
					type="password"
					label="Enter PIN"
					variant="outlined"
					value={pin}
					onChange={handlePinChange}
					error={!!error}
					helperText={error}
					style={{ marginBottom: '10px', width: '300px' }}
					inputProps={{ style: { height: '40px', fontSize: '18px' } }}
				/>
				<Button type="submit" variant="contained" color="primary">
					Submit
				</Button>
			</form>
		);
}

