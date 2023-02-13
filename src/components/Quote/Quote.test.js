import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Quote from './Quote';

describe('Quote component', () => {
  test('renders the component correctly', () => {
    const { getByTestId } = render(<Quote />);
    expect(getByTestId('quote-container')).toBeInTheDocument();
  });

  test('formats the date correctly', () => {
    const { getByTestId } = render(<Quote />);
    expect(getByTestId('quote-start-date').textContent).toMatch(/\w{3,9} \d{1,2}, \d{4}/);
  });

  test('formats the currency correctly for monthly payment option', () => {
    const { getByTestId } = render(<Quote />);
    expect(getByTestId('quote-monthly-price').textContent).toMatch(/£\d+(\.\d{2})?/);
  });

  test('formats the currency correctly for yearly payment option', () => {
    const { getByTestId } = render(<Quote />);
    expect(getByTestId('quote-yearly-price').textContent).toMatch(/£\d+(\.\d{2})?/);
  });

  test('toggles the payment option correctly', () => {
    const { getByTestId } = render(<Quote />);
    fireEvent.click(getByTestId('toggle-payment-option-button'));
    expect(getByTestId('payment-option-label').textContent).toBe('Annually');
    fireEvent.click(getByTestId('toggle-payment-option-button'));
    expect(getByTestId('payment-option-label').textContent).toBe('Monthly');
  });
});
