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

const sendFiles = async formData => {
  const uploadUrl = `${apiUrl}/upload`;
  return await fetch(uploadUrl, {
    headers: {
      Accept: '*/*',
      Authorization: 'Bearer ' + Auth.getToken()
    },
    method: 'POST',
    body: formData
  });
};

// TODO - resolve stringfy removing properties
const saveFilePath = async (payload) => {
  const savePathUrl = `${apiUrl}/save`;
  console.log('client saveFilePath api', payload, '-', JSON.stringify(payload));
  const fileUrlRes = await fetch(savePathUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + Auth.getToken()
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const filesPath = await fileUrlRes.json();
  return filesPath;
}

const getProcessedFiles = async (email) => {
  const getFilesUrl = `${apiUrl}/processed?email=${email}`;
  const fileUrlRes = await fetch(getFilesUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + Auth.getToken()
    },
    method: 'GET'
  });

  const files = await fileUrlRes.json();
  console.log('getProcessedFiles client api', files, ' - ', fileUrlRes);
  return files;
}

export {
  getFileUrl,
  sendFiles,
  saveFilePath,
  getProcessedFiles
}