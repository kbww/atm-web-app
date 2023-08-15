import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PinForm } from '../PinForm';

// Mock the processApiRequest function
jest.mock('../lib/api', () => ({
	processApiRequest: jest.fn((pin) => {
		if (pin === '1111') {
			return Promise.resolve();
		} else {
			return Promise.reject('Incorrect PIN');
		}
	}),
}));

describe('PinForm', () => {
	it('renders correctly', () => {
		render(<PinForm onSuccessfulPin={() => {}} />);
		expect(screen.getByLabelText('Enter PIN')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
	});

	it('submits the form with correct PIN', async () => {
		const onSuccessfulPinMock = jest.fn();
		render(<PinForm onSuccessfulPin={onSuccessfulPinMock} />);

		userEvent.type(screen.getByLabelText('Enter PIN'), '1111');
		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

		await waitFor(() => {
			expect(onSuccessfulPinMock).toHaveBeenCalled();
		});
	});

	it('displays error message on incorrect PIN', async () => {
		render(<PinForm onSuccessfulPin={() => {}} />);

		userEvent.type(screen.getByLabelText('Enter PIN'), '1234');
		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

		await waitFor(() => {
			expect(screen.getByText('Incorrect PIN. Please try again.')).toBeInTheDocument();
		});
	});

	it('clears error message when correct PIN is entered', async () => {
		render(<PinForm onSuccessfulPin={() => {}} />);

		userEvent.type(screen.getByLabelText('Enter PIN'), '1234');
		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

		userEvent.type(screen.getByLabelText('Enter PIN'), '1111');
		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

		await waitFor(() => {
			expect(screen.queryByText('Incorrect PIN. Please try again.')).toBeNull();
		});
	});
});
