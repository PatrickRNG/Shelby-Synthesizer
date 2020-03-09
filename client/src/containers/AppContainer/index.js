import React, { useState } from 'react';
import 'antd/dist/antd.css';

import { Layout, Main } from '../../components';
import { FileProvider } from '../../contexts/FileContext';

const AppContainer = () => {
  const [files, setFiles] = useState([]);

  const deleteFile = (files, index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  }
  
  return (
    <FileProvider value={{ files, setFiles, deleteFile }}>
      <Layout>
        <Main />
      </Layout>
    </FileProvider>
  );
};

export default AppContainer;
