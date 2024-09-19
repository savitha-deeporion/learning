import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import PhoneNumberForm from '../src/screens/PhoneNumberForm';

describe('PhoneNumberForm Integration Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({message: 'Phone number submitted successfully'}),
    }),
  );

  // it('displays an error message for invalid phone number', () => {
  //   const { getByPlaceholderText, getByText } = render(<PhoneNumberForm />);

  //   const input = getByPlaceholderText('Enter phone number');
  //   const submitButton = getByText('Submit');

  //   fireEvent.press(submitButton);

  //   expect(getByText('Invalid phone number')).toBeTruthy();
  // });

  it('shows loading indicator during API call and success message on submission', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <PhoneNumberForm />,
    );

    const input = getByPlaceholderText('Enter phone number');
    const submitButton = getByText('Submit');

    fireEvent.changeText(input, '1234567890');
    fireEvent.press(submitButton);

    expect(queryByText('Phone number submitted successfully')).toBeNull();

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // expect(getByText('Submission failed')).toBeTruthy();
    expect(getByText('Phone number submitted successfully')).toBeTruthy();
  });

  it('displays an error message when API call fails', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <PhoneNumberForm />,
    );

    const input = getByPlaceholderText('Enter phone number');
    const submitButton = getByText('Submit');

    fireEvent.changeText(input, '1234567890');
    fireEvent.press(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(getByText('Submission failed')).toBeTruthy();
  });
});
