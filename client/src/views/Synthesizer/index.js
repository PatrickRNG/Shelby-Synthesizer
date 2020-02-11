import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dropzone, DropText, FileArea, FileList } from './styles.js';

import CloudIcon from '../../assets/icons/cloud-upload';

const Synthesizer = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FileArea>
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
      {files.map(file => (
        <li>{file.name}</li>
      ))}
    </FileList>
    </FileArea>
  );
};

export default Synthesizer;
