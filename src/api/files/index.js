import Auth from '../../utils/Auth';
import { apiUrl as BASE_URL } from '../../config';

const apiUrl = `${BASE_URL}/files`;

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

// const sendFiles = async formData => {
//   const uploadUrl = `${apiUrl}/upload`;
//   return await fetch(uploadUrl, {
//     headers: {
//       Accept: '*/*',
//       Authorization: 'Bearer ' + Auth.getToken()
//     },
//     method: 'POST',
//     body: formData
//   });
// };

const getProcessedFiles = async () => {
  const getFilesUrl = `${apiUrl}/processed`;
  const fileUrlRes = await fetch(getFilesUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + Auth.getToken()
    },
    method: 'GET'
  });

  const files = await fileUrlRes.json();
    return files;
}

const processFile = async (file) => {
  const sendFilesUrl = `${apiUrl}/process`;
  const fileUrlRes = await fetch(sendFilesUrl, {
    headers: {
      Accept: '*/*',
      Authorization: 'Bearer ' + Auth.getToken()
    },
    method: 'POST',
    body: file
  });

  const response = await fileUrlRes.json();
  return response;
}

const deleteProcessedFile = async (file) => {
  const deleteFileUrl = `${apiUrl}/delete`;
  const fileUrlRes = await fetch(deleteFileUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + Auth.getToken()
    },
    method: 'DELETE',
    body: JSON.stringify({ filename: file.filename })
  });

  const response = await fileUrlRes.json();
  return response;
}

export {
  getFileUrl,
  // sendFiles,
  processFile,
  getProcessedFiles,
  deleteProcessedFile
}