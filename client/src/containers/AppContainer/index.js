import React, { useState } from 'react';
import 'antd/dist/antd.css';

import { Layout, Main } from '../../components';
import { FileProvider } from '../../contexts/FileContext';

const AppContainer = () => {
  const [files, setFiles] = useState([]);

  return (
    <FileProvider value={{ files, setFiles }}>
      <Layout>
        <Main />
      </Layout>
    </FileProvider>
  );
};

export default AppContainer;
