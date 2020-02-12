import styled from 'styled-components';
import { Icon } from "antd";

const Dropzone = styled.div`
  height: 50%;
  border: 2px dashed #dcdcdc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DropText = styled.p`
  margin-top: 25px;
`;

const FileList = styled.div`
  margin-top: 40px;
`;

const FileIcon = styled.div`
  font-size: 30px;
  margin-right: 10px;
`;

const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 2px 0;
  border-bottom: 1px solid #f5f5f5;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileName = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #888;
`;

const FileSize = styled.div`
  color: #adadad;
`;

const RemoveIcon = styled(Icon)`
  margin: 0 14px;
  color: #adadad;
  cursor: pointer;
  transition: color .2s;

  &:hover {
    color: #fd9a9a;
  }
`;

const DownloadIcon = styled(Icon)`
  margin-left: auto;
  color: #adadad;
  cursor: pointer;
  transition: color .2s;

  &:hover {
    color: #717171;
  }
`;

export {
  Dropzone,
  DropText,
  FileList,
  FileIcon,
  Flex,
  FileWrapper,
  FileName,
  FileSize,
  RemoveIcon,
  DownloadIcon
};
