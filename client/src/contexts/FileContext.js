import { createContext } from 'react';

const FileContext = createContext({});

export const FileProvider = FileContext.Provider;
export const FileConsumer = FileContext.Consumer;

export default FileContext;