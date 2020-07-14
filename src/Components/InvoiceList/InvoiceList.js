import React from 'react';
import { InvoiceListItem } from '../InvoiceListItem';
import styles from './InvoiceList.module.css';

export const InvoiceList = ({ endpoint, className = '', ...props }) => {
  const [invoices, setInvoices] = React.useState([]);

  const fetchAllInvoices = () => {
    fetch(`${endpoint}/invoice/`, {
      method: 'GET',
      headers: new Headers({}),
    })
      .then((res) => res.json())
      .then((jsonResponse) => {
        setInvoices(jsonResponse);
      })
      .catch((error) => console.error(error));
  };

  React.useEffect(fetchAllInvoices, [endpoint]);

  const confirmErrorForInvoice = (invoice) => {
    if (invoice.error_state !== 1) {
      return;
    }

    invoice.error_state = 2; // Confirmed error

    fetch(`${endpoint}/invoice/${invoice.id}/`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(invoice),
    })
      .then((res) => res.json())
      .then((jsonResponse) => {
        return fetchAllInvoices();
      })
      .catch((error) => console.error(error));
  };
  const refuteErrorForInvoice = (invoice) => {
    if (invoice.error_state !== 1) {
      return;
    }

    invoice.error_state = 3; // Refuted error

    fetch(`${endpoint}/invoice/${invoice.id}/`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(invoice),
    })
      .then((res) => res.json())
      .then((jsonResponse) => {
        return fetchAllInvoices();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={`${styles.invoiceList} ${className}`}>
      <header>
        <h1 className={styles.mainHeader}>Invoices</h1>
      </header>
      <h2 className={styles.sectionHeader}>Invoices to check</h2>
      <ul>
        {invoices
          .filter((invoice) => invoice.error_state === 1)
          .map((invoice) => (
            <InvoiceListItem
              key={invoice.id}
              invoice={invoice}
              onConfirmError={confirmErrorForInvoice}
              onRefuteError={refuteErrorForInvoice}
            />
          ))}
      </ul>
      <h2>Checked invoices</h2>
      <ul className={styles.listContainer}>
        {invoices
          .filter((invoice) => invoice.error_state !== 1)
          .map((invoice) => (
            <InvoiceListItem
              key={invoice.id}
              invoice={invoice}
              onConfirmError={confirmErrorForInvoice}
              onRefuteError={refuteErrorForInvoice}
            />
          ))}
      </ul>
    </div>
  );
};
