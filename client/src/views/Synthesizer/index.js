import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'antd';

import {
  Dropzone,
  DropText,
  FileList,
  FileIcon,
  Flex,
  FileWrapper,
  FileName,
  FileSize,
  RemoveIcon,
  DownloadIcon,
  Button
} from './styles.js';
import CloudIcon from '../../assets/icons/cloud-upload';

const Synthesizer = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  const getFileIcon = type => {
    switch (type) {
      case 'application/pdf':
        return <Icon type="file-pdf" />;
      case 'image/jpeg':
      case 'image/png':
        return <Icon type="file-image" />;
      default:
        return <Icon type="file-text" />;
    }
  };

  const deleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const synthesizeFiles = () => {
    // Send files to API and set the returned files response
    // Iterate files, each file calls API
    files.forEach(file => {
      // const newFile = callApi(file);
      
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <Flex>
      <Dropzone {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudIcon />
        {isDragActive ? (
          <DropText>Solte os arquivos aqui</DropText>
        ) : (
          <DropText>
            Arraste os arquivos aqui ou <b>selecione</b> do seu computador
          </DropText>
        )}
      </Dropzone>
      <FileList>
        {files.map((file, i) => (
          <div key={i}>
            <FileWrapper>
              <FileIcon>{getFileIcon(file.type)}</FileIcon>
              <Flex>
                <FileName>{file.name}</FileName>
                <FileSize>{Math.round(file.size / 1e6)}mb</FileSize>
              </Flex>
              <DownloadIcon type='download' />
              <RemoveIcon type='delete' onClick={() => deleteFile(i)} />
            </FileWrapper>
          </div>
        ))}
      </FileList>
      <Button onClick={synthesizeFiles}>Sintetizar</Button>
    </Flex>
  );
};

export default Synthesizer;
