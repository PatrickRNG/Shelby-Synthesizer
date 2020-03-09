import React, { useContext, useState, useEffect } from 'react';
import FileContext from '../../contexts/FileContext';
import UserContext from '../../contexts/UserContext';
import { File } from '../../components';
import { FileList } from '../Synthesizer/styles';
import { getFileUrl, getProcessedFiles } from '../../api/files';

const Dashboard = () => {
  const { deleteFile } = useContext(FileContext);
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);

  const getFiles = async (email) => {
    const res = await getProcessedFiles(email);
    console.log('getFiles res', res);
    setFiles(res.files);
  }

  useEffect(() => {
    if (user.email) {
      getFiles(user.email);
    }
  }, [user]);


  return (
    <FileList>
      {files ? files.map((file, index) => (
        file.loading === 'processed' && 
        <File
          loading={file.loading}
          key={index}
          file={file}
          index={index}
          deleteFile={deleteFile}
          getFileUrl={getFileUrl}
          setFiles={setFiles}
          files={files}
        />
      )) : 
        <h3>No processed files found</h3>
      }
    </FileList>
  );
};

export default Dashboard;
