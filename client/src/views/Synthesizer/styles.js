import styled from 'styled-components';
import { Icon } from "antd";

const Dropzone = styled.div`
  height: 40%;
  min-height: 170px;
  border: 2px dashed #dcdcdc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const DropText = styled.p`
  margin-top: 15px;
  text-align: center;
`;

const FileList = styled.div`
  margin: 20px 0;
  overflow: auto;
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
  height: 100%;

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

const Button = styled.button`
  width: 100px;
  padding: 5px 0;
  background: #001529;
  border: none;
  margin-top: auto;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity .1s;
  outline: none;

  &:hover {
    opacity: .9;
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
  DownloadIcon,
  Button
};
