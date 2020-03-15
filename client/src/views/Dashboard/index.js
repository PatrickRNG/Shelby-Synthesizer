import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { File } from '../../components';
import { FileList } from '../Synthesizer/styles';
import { getFileUrl, getProcessedFiles, deleteProcessedFile } from '../../api/files';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);

  const getFiles = async (email) => {
    const res = await getProcessedFiles(email);
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
        file.loading === 'processed' && <File
          loading={file.loading}
          key={index}
          file={file}
          index={index}
          deleteFile={() => deleteProcessedFile(file)}
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
