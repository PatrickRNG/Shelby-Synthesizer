import React, { useState, useEffect } from 'react';
import { Icon, Spin } from 'antd';
import { getDownloadUrl } from '../../api/files'

import {
  FileIcon,
  Flex,
  FileWrapper,
  FileName,
  FileSize,
  RemoveIcon,
  DownloadIcon,
  LoadingIcon,
  ProcessedText
} from './styles.js';

const File = ({
  file,
  loading,
  deleteFile,
}) => {
  const [fileUrl, setFileUrl] = useState('');

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
    const fetchDownloadUrl = async () => {
      const { downloadUrl } = await getDownloadUrl(file);
      setFileUrl(downloadUrl);
    };
    
    fetchDownloadUrl();
  }, []);

  const isProcessed = file.loading === 'processed';

  return (
    <FileWrapper>
      <Flex direction="row">
        <FileIcon>{getFileIcon(file.type)}</FileIcon>
        <Flex>
          <FileName>{(file.name || file.filename)}</FileName>
          <FileSize>{file.size && calcFileSize(file.size)}</FileSize>
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
        <RemoveIcon type="delete" onClick={deleteFile} />
      </div>
    </FileWrapper>
  );
};

export default File;
