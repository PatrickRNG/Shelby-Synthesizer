import styled from 'styled-components';

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

const FileArea = styled.div`
  height: 100%;
`;

const FileList = styled.div`
  margin-top: 40px;
`;

export { Dropzone, DropText, FileArea, FileList };
