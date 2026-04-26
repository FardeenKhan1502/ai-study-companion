import { createContext, useState, useContext } from 'react';

const SyllabusContext = createContext();

export function SyllabusProvider({ children }) {
  const [syllabusData, setSyllabusData] = useState(null);

  return (
    <SyllabusContext.Provider value={{ syllabusData, setSyllabusData }}>
      {children}
    </SyllabusContext.Provider>
  );
}

export function useSyllabus() {
  return useContext(SyllabusContext);
}
