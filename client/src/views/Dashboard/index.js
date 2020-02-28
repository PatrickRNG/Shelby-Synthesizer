import React, { useContext } from 'react';
import FileContext from '../../contexts/FileContext';

const Dashboard = () => {

  const { files } = useContext(FileContext);

  return (
    <div>
      Count: {files.length}
      <ul>
        {files.map((file) => (<li>{file.name} - {file.url} </li>))}
      </ul>
    </div>
  );
};

export default Dashboard;
