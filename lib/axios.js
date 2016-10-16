const axios = require('axios');
const iconv = require('iconv-lite');

axios.interceptors.response.use(function(response) {
  var ctype = response.headers['content-type'];
  const data = ctype.includes('charset=WINDOWS-1251')
    ? iconv.decode(response.data, 'win1251')
    : iconv.decode(response.data, 'utf-8');
  try {
    response.data = typeof data === 'string' ? JSON.parse(data) : data;
  } catch (err) {
    response.data = data;
  }
  return response;
});

module.exports = axios;
