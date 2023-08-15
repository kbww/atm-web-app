import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WithdrawalForm } from '../WithdrawlForm';

describe('WithdrawalForm', () => {
	it('renders correctly with initial balance', () => {
		const initialBalance = 1000;
		render(<WithdrawalForm initialBalance={initialBalance} />);
		expect(screen.getByText(`Current Balance: £${initialBalance}`)).toBeInTheDocument();
		expect(screen.getByLabelText('Withdrawal Amount')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Withdraw' })).toBeInTheDocument();
	});

	it('handles valid withdrawal', async () => {
		const initialBalance = 1000;
		render(<WithdrawalForm initialBalance={initialBalance} />);

		userEvent.type(screen.getByLabelText('Withdrawal Amount'), '100');
		fireEvent.click(screen.getByRole('button', { name: 'Withdraw' }));

		await waitFor(() => {
			expect(screen.getByText(`Current Balance: £${initialBalance - 100}`)).toBeInTheDocument();
		});
	});

	it('handles invalid withdrawal (negative amount)', async () => {
		const initialBalance = 1000;
		render(<WithdrawalForm initialBalance={initialBalance} />);

		userEvent.type(screen.getByLabelText('Withdrawal Amount'), '-50');
		fireEvent.click(screen.getByRole('button', { name: 'Withdraw' }));

		await waitFor(() => {
			expect(screen.getByText('Invalid withdrawal amount.')).toBeInTheDocument();
		});
	});

	it('handles withdrawal exceeding balance and overdraft limit', async () => {
		const initialBalance = 1000;
		render(<WithdrawalForm initialBalance={initialBalance} />);

		userEvent.type(screen.getByLabelText('Withdrawal Amount'), '1200');
		fireEvent.click(screen.getByRole('button', { name: 'Withdraw' }));

		await waitFor(() => {
			expect(screen.getByText('Withdrawal amount exceeds available balance and overdraft limit.')).toBeInTheDocument();
		});
	});

	it('handles unable to dispense requested amount with available notes', async () => {
		const initialBalance = 1000;
		render(<WithdrawalForm initialBalance={initialBalance} />);

		userEvent.type(screen.getByLabelText('Withdrawal Amount'), '8');
		fireEvent.click(screen.getByRole('button', { name: 'Withdraw' }));

		await waitFor(() => {
			expect(screen.getByText('Unable to dispense requested amount with available notes.')).toBeInTheDocument();
		});
	});

	it('updates balance after successful withdrawal', async () => {
		const initialBalance = 1000;
		render(<WithdrawalForm initialBalance={initialBalance} />);

		userEvent.type(screen.getByLabelText('Withdrawal Amount'), '50');
		fireEvent.click(screen.getByRole('button', { name: 'Withdraw' }));

		await waitFor(() => {
			expect(screen.getByText(`Current Balance: £${initialBalance - 50}`)).toBeInTheDocument();
		});

		userEvent.type(screen.getByLabelText('Withdrawal Amount'), '30');
		fireEvent.click(screen.getByRole('button', { name: 'Withdraw' }));

		await waitFor(() => {
			expect(screen.getByText(`Current Balance: £${initialBalance - 50 - 30}`)).toBeInTheDocument();
		});
	});
});
