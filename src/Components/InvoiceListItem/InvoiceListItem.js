import React from 'react';
import styles from './InvoiceListItem.module.css';

const error_states = ['', 'Suspect', 'Confirmed Error', 'Confirmed Correct'];

export const InvoiceListItem = ({
  invoice,
  onConfirmError,
  onRefuteError,
  className = '',
  ...props
}) => {
  const confirmError = () => onConfirmError(invoice);
  const refuteError = () => onRefuteError(invoice);

  return (
    <li className={`${styles.invoice} ${className}`}>
      <div className={styles.firstRow}>
        <div className={styles.emphasis}>{`Supplier: ${invoice.supplier}`}</div>
        <div>{`Amount: £${invoice.amount}`}</div>
        <div>{`Payment status: ${invoice.is_open ? 'Unpaid' : 'Paid'}`}</div>
        <div>{`Reference: ${invoice.reference}`}</div>
      </div>
      <div className={styles.secondRow}>
        <div>{`Due: ${invoice.due_date}`}</div>
        <div>{`Issued: ${invoice.date}`}</div>
        <div className={styles.emphasis}>{`Error state: ${
          error_states[invoice.error_state]
        }`}</div>
        <div
          className={styles.emphasis}
        >{`Error description: ${invoice.data_error}`}</div>
      </div>
      {invoice.error_state === 1 && (
        <div className={styles.controls}>
          <>
            <button className={styles.button} onClick={confirmError}>
              Confirm Error
            </button>
            <button className={styles.button} onClick={refuteError}>
              Refute Error
            </button>
          </>
        </div>
      )}
    </li>
  );
};
