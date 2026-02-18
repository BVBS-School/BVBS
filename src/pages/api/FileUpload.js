import axios from 'axios';
const API_URL = 'https://api.imgur.com/3/image';

let FileUpload = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    "Authorization": 'Client-ID fa9cff918a9554a',
  }
});

export default FileUpload;
