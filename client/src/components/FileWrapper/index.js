import React, { useState, useEffect } from 'react';
import { Icon, Spin } from 'antd';

import {
  FileIcon,
  Flex,
  FileWrapper as FileWrapperStyled,
  FileName,
  FileSize,
  RemoveIcon,
  DownloadIcon,
  LoadingIcon,
  ProcessedText
} from './styles.js';

const FileWrapper = ({
  file,
  loading,
  index,
  deleteFile,
  getFileUrl,
  files,
  setFiles,
}) => {
  const [fileUrl, setFileUrl] = useState(null);

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
  const loadingIcon = <LoadingIcon type="loading" spin />;

  const loadingState = loading => {
    switch (loading) {
      case 'true':
        return <Spin indicator={loadingIcon} />;
      case 'processed':
        return <ProcessedText>Processed</ProcessedText>;
      default:
        return '';
    }
  };

  const calcFileSize = size => {
    if (String(size).length < 7) {
      return `${Math.round(file.size / 1000)}kb`;
    }

    return `${Math.round(file.size / 1e6)}mb`;
  };

  useEffect(() => {
    async function getFilePath() {
      const filePath = await getFileUrl(file.name);
      setFileUrl(filePath);
      // Add download URL to files
      const newFiles = files.map((val) => {
        if (file.name === val.name) {
          val.url = filePath;
        }
        return val;
      });
      setFiles(newFiles);
    }

    getFilePath();
  }, [file]);

  const isProcessed = file.loading === 'processed';

  return (
    <FileWrapperStyled>
      <Flex direction="row">
        <FileIcon>{getFileIcon(file.type)}</FileIcon>
        <Flex>
          <FileName>{file.name}</FileName>
          <FileSize>{calcFileSize(file.size)}</FileSize>
        </Flex>
      </Flex>
      <div>
        {loadingState(loading)}
        <a
          href={isProcessed ? fileUrl : null}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DownloadIcon disabled={!isProcessed} type="download" />
        </a>
        <RemoveIcon type="delete" onClick={() => deleteFile(index)} />
      </div>
    </FileWrapperStyled>
  );
};

export default FileWrapper;
