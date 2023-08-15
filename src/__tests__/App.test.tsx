import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

// Mock the processApiRequest function
jest.mock('../lib/api', () => ({
	processApiRequest: jest.fn((pin) => {
		if (pin === '1111') {
			return Promise.resolve({ currentBalance: 1000 });
		} else {
			return Promise.reject('Invalid PIN');
		}
	}),
}));

describe('App', () => {
	it('displays PinForm initially', () => {
		render(<App />);

		expect(screen.getByLabelText('Enter PIN')).toBeInTheDocument();
	});

	it('displays WithdrawalForm after successful PIN entry', async () => {
		render(<App />);

		userEvent.type(screen.getByLabelText('Enter PIN'), '1111');
		userEvent.click(screen.getByText('Submit'));

		await waitFor(() => {
			expect(screen.getByText('Withdrawal Form')).toBeInTheDocument();
			expect(screen.queryByLabelText('Enter PIN')).not.toBeInTheDocument();
		});
	});

	it('fetches balance and displays WithdrawalForm', async () => {
		render(<App />);

		userEvent.type(screen.getByLabelText('Enter PIN'), '1111');
		userEvent.click(screen.getByText('Submit'));

		await waitFor(() => {
			expect(screen.getByText('Withdrawal Form')).toBeInTheDocument();
		});

		userEvent.type(screen.getByLabelText('Withdrawal Amount'), '100');
		userEvent.click(screen.getByText('Withdraw'));

		await waitFor(() => {
			expect(screen.getByText('Withdrawal successful!')).toBeInTheDocument();
		});
	});

	it('displays error message on invalid PIN entry', async () => {
		render(<App />);

		userEvent.type(screen.getByLabelText('Enter PIN'), '1234');
		userEvent.click(screen.getByText('Submit'));

		await waitFor(() => {
			expect(screen.getByText('Invalid PIN')).toBeInTheDocument();
		});
	});
});
