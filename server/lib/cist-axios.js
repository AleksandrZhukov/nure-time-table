import Axios from 'axios';
import iconv from 'iconv-lite';

const axios = Axios.create({
  baseURL: 'http://cist.nure.ua/ias/app/tt/'
});

axios.interceptors.response.use(res => {
  const data = decodeData(res.data);
  try {
    res.data = typeof data === 'string' ? JSON.parse(data) : data;
  } catch (err) {
    res.data = data;
  }
  return res;
}, error => {
  const data = decodeData(error.response.data);
  try {
    error.data = typeof data === 'string' ? JSON.parse(data) : data;
  } catch (err) {
    error.data = data;
  }
  throw error;
});

const decodeData = (data) => {
  return iconv.decode(data, 'win1251');
};

export default axios;
