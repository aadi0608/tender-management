// src/context/TenderContext.js
import React, { createContext, useState } from 'react';
import initialTenders from '../data/tenders.json';

export const TenderContext = createContext();

export const TenderProvider = ({ children }) => {
  const [tenders, setTenders] = useState(initialTenders);

  const addTender = (newTender) => {
    setTenders([...tenders, newTender]);
  };

  const updateTender = (updatedTender) => {
    const updatedTenders = tenders.map((tender) =>
      tender.id === updatedTender.id ? updatedTender : tender
    );
    setTenders(updatedTenders);
  };

  return (
    <TenderContext.Provider value={{ tenders, addTender, updateTender }}>
      {children}
    </TenderContext.Provider>
  );
};
    