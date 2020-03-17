import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';

import { Dropzone, DropText, FileList, FlexForm, Button } from './styles.js';
import CloudIcon from '../../assets/icons/cloud-upload';
import { File } from '../../components';
import FileContext from '../../contexts/FileContext';
import { getFileUrl, processFile } from '../../api/files';

const Synthesizer = () => {
  const { files, setFiles, deleteFile } = useContext(FileContext);

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

  const synthesizeFiles = async (e, files) => {
    try {
      e.preventDefault();
      const loadingFiles = files.map(file => {
        file.loading = 'true';
        return file;
      });


      setFiles(loadingFiles);

      await Promise.all(
        files.map(async file => {
          const formData = new FormData();
          formData.append('file', file);
          await processFile(formData);
          
          file.loading = 'processed';
          const remainingFiles = loadingFiles.filter(
            val => val.name !== file.name
          );
          const filesCompleted = [file, ...remainingFiles];
          filesCompleted.sort((a, b) => a.name.localeCompare(b.name));
          setFiles(filesCompleted);
        })
      );
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
            deleteFile={() => deleteFile(files, index)}
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
