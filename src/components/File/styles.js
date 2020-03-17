import styled from 'styled-components';
import { Icon } from "antd";

const FileIcon = styled.div`
  font-size: 30px;
  margin-right: 10px;
`;

const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 2px 0;
  border-bottom: 1px solid #f5f5f5;
  justify-content: space-between;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
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
  color: ${props => props.disabled ? '#e2e2e2' : '#6f6f6f'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: color .2s;
  
  &:hover {
    color: #8bb7ef;
  }
`;

const LoadingIcon = styled(Icon)`
  font-size: 16px;
  margin-right: 14px;
`;

const ProcessedText = styled.span`
  color: #8bb7ef;
  margin-right: 14px;
`;

export {
  FileIcon,
  Flex,
  FileWrapper,
  FileName,
  FileSize,
  RemoveIcon,
  DownloadIcon,
  LoadingIcon,
  ProcessedText
};
