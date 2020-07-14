import React from 'react';
import { InvoiceList } from 'Components';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <InvoiceList endpoint={'http://3.8.158.57'} />
    </div>
  );
};

export default App;
