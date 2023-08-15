import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PinForm } from "./components/PinForm";
import{ WithdrawalForm } from "./components/WithdrawlForm";
import theme from "./styles";
import { processApiRequest } from "./lib/api";

const PIN = "1111";

export function App() {
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);

  const fetchBalance = async () => {
    try {
      const response = await processApiRequest(PIN);
      setCurrentBalance(response.currentBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
		<ThemeProvider theme={theme}>
			<Container>
				<Typography variant="h4" component="h1" align="center">
					ATM
				</Typography>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '30vh',
					}}
				>
					{currentBalance !== null ? (
						<WithdrawalForm initialBalance={currentBalance} />
					) : (
						<PinForm onSuccessfulPin={fetchBalance} />
					)}
				</div>
			</Container>
		</ThemeProvider>
	);
}
