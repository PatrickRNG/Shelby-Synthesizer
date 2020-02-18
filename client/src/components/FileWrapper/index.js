import React from 'react';
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
  deleteFile,
  downloadFile
}) => {
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
  const antIcon = <LoadingIcon type="loading" spin />;

  const loadingState = loading => {
    switch (loading) {
      case 'true':
        return <Spin indicator={antIcon} />
      case 'processed':
        return <ProcessedText>Processed</ProcessedText>
      default:
        return '';
    }
  };

  const isProcessed = file.loading === 'processed';
  
  return (
    <FileWrapperStyled>
      <Flex direction="row">
        <FileIcon>{getFileIcon(file.type)}</FileIcon>
        <Flex>
          <FileName>{file.name}</FileName>
          <FileSize>{Math.round(file.size / 1e6)}mb</FileSize>
        </Flex>
      </Flex>
      <div>
        {loadingState(loading)}
        <DownloadIcon disabled={!isProcessed} onClick={isProcessed ? downloadFile : null} type="download" />
        <RemoveIcon type="delete" onClick={deleteFile} />
      </div>
    </FileWrapperStyled>
  );
};

export default FileWrapper;