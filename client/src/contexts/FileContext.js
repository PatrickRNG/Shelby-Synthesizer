import { createContext } from 'react';

const FileContext = createContext({});

export const FileProvider = FileContext.Provider;

export default FileContext;