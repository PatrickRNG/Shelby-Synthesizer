import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { File } from '../../components';
import { FileList } from '../Synthesizer/styles';
import { getProcessedFiles, deleteProcessedFile } from '../../api/files';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    const res = await getProcessedFiles();
    setFiles(res.files);
  }

  useEffect(() => {
    if (user.email) {
      getFiles();
    }
  }, [user]);

  const deleteFile = async (file) => {
    await deleteProcessedFile(file);
    getFiles();
  };

  return (
    <FileList>
      {files && files.length > 0 ? files.map((file, index) => (
        file.loading === 'processed' && <File
          loading={file.loading}
          key={index}
          file={file}
          index={index}
          deleteFile={() => deleteFile(file)}
          setFiles={setFiles}
          fileUrl={''}
        />
      )) : 
        <h3>Não há arquivos processados</h3>
      }
    </FileList>
  );
};

export default Dashboard;
