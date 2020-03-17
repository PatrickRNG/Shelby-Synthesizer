import styled from 'styled-components';

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

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  FlexForm,
  Button
};
