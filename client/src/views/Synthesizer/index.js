import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  Dropzone,
  DropText,
  FileList,
  FlexForm,
  Button
} from './styles.js';
import CloudIcon from '../../assets/icons/cloud-upload';
import { apiUrl as BASE_URL } from '../../config/';
import { FileWrapper } from '../../components';

const apiUrl = `${BASE_URL}/files`;

const Synthesizer = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const newAcceptedFiles = acceptedFiles
    .filter(file => file.type === 'application/pdf')
    .map(file => {
      file.loading = 'false';
      return file;
    });

    newAcceptedFiles.sort((a, b) => a.name.localeCompare(b.name));
    setFiles(newAcceptedFiles);
  }, []);
  
  const deleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const fakeApiResponse = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(file);
      }, Math.random() * 5000);
    });
  }

  const sendFiles = async (formData) => {
    return await fetch(apiUrl, {
      headers: {
        Accept: '*/*',
      },
      method: 'POST',
      body: formData
    });
  };

  const synthesizeFiles =async (e, files) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      const loadingFiles = files.map(file => {
        file.loading = 'true';
        return file;
      });

      setFiles(loadingFiles);

      await Promise.all(files.map(async (file) => {
        const processedFile = await fakeApiResponse(file);
        processedFile.loading = 'processed';
        const remainingFiles = loadingFiles.filter(val => val.name !== processedFile.name);
        const filesCompleted = [processedFile, ...remainingFiles];
        filesCompleted.sort((a, b) => a.name.localeCompare(b.name));
        setFiles(filesCompleted);
        formData.append('files', file);
      }));

      await sendFiles(formData);
    } catch (err) {
      console.log('ERROR', err);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <FlexForm onSubmit={(e) => synthesizeFiles(e, files)} encType='multipart/form-data'>
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
          <FileWrapper loading={file.loading} key={i} file={file} deleteFile={() => deleteFile(i)} />
        ))}
      </FileList>
      <Button type='submit'>Sintetizar</Button>
    </FlexForm>
  );
};

export default Synthesizer;
