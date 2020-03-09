import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';

import { Dropzone, DropText, FileList, FlexForm, Button } from './styles.js';
import CloudIcon from '../../assets/icons/cloud-upload';
import { File } from '../../components';
import FileContext from '../../contexts/FileContext';
import UserContext from '../../contexts/UserContext';
import { getFileUrl, sendFiles, saveFilePath } from '../../api/files';

const Synthesizer = () => {
  const { files, setFiles, deleteFile } = useContext(FileContext);
  const { user } = useContext(UserContext);

  const onDrop = useCallback(async acceptedFiles => {
    const newAcceptedFiles = acceptedFiles
      .filter(file => file.type === 'application/pdf')
      .map(file => {
        file.loading = 'false';
        return file;
      });

    newAcceptedFiles.sort((a, b) => a.name.localeCompare(b.name));
    setFiles(newAcceptedFiles);
  }, []);

  const fakeApiResponse = file => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(file);
      }, Math.random() * 2000);
    });
  };

  const addNameToFiles = (files, uploadedFiles) => {
    return new Promise((resolve, reject) => {
      for (let file of uploadedFiles) {
        for (let originalFile of files) {
          if (originalFile.name === file.originalname) {
            originalFile.filename = file.filename;
          }
        }
      }

      resolve(files);
    });
  };

  const synthesizeFiles = async (e, files) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      const loadingFiles = files.map(file => {
        file.loading = 'true';
        return file;
      });

      setFiles(loadingFiles);

      await Promise.all(
        files.map(async file => {
          const processedFile = await fakeApiResponse(file);
          processedFile.loading = 'processed';
          const remainingFiles = loadingFiles.filter(
            val => val.name !== processedFile.name
          );
          const filesCompleted = [processedFile, ...remainingFiles];
          filesCompleted.sort((a, b) => a.name.localeCompare(b.name));
          setFiles(filesCompleted);
          formData.append('files', file);
        })
      );
      
      const uploadedFiles = await sendFiles(formData);
      const uploadedFilesJson = await uploadedFiles.json();

      const updatedFiles = await addNameToFiles(files, uploadedFilesJson.files);
      setFiles(updatedFiles);
      
      const pathPayload = { email: user.email, files };
      console.log('saveFilePath pathPayload', updatedFiles);
      await saveFilePath(pathPayload);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FlexForm
      onSubmit={e => synthesizeFiles(e, files)}
      encType="multipart/form-data"
    >
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
        {files.map((file, index) => (
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
        ))}
      </FileList>
      <Button type="submit">Sintetizar</Button>
    </FlexForm>
  );
};

export default Synthesizer;
