import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';

import { Dropzone, DropText, FileList, FlexForm, Button } from './styles.js';
import CloudIcon from '../../assets/icons/cloud-upload';
import { apiUrl as BASE_URL } from '../../config/';
import { FileWrapper } from '../../components';
import Auth from '../../utils/Auth';
import FileContext from '../../contexts/FileContext';

const apiUrl = `${BASE_URL}/files`;

const Synthesizer = () => {
  const { files, setFiles } = useContext(FileContext);

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

  const deleteFile = index => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const fakeApiResponse = file => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(file);
      }, Math.random() * 2000);
    });
  };

  const sendFiles = async formData => {
    const uploadUrl = `${apiUrl}/upload`;
    return await fetch(uploadUrl, {
      headers: {
        Accept: '*/*',
        Authorization: 'Bearer ' + Auth.getToken()
      },
      method: 'POST',
      body: formData
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

  const getFileUrl = async fileName => {
    const downloadUrl = `${apiUrl}/download`;
    const fileUrlRes = await fetch(downloadUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Auth.getToken()
      },
      method: 'POST',
      body: JSON.stringify({ fileName })
    });

    const { filePath } = await fileUrlRes.json();
    return filePath;
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
          <FileWrapper
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
