const apiCtrl = {};
const axios = require('../lib/axios');
const iconv = require('iconv-lite');
const querystring = require('querystring');

const BASE_URL = 'http://cist.nure.ua/ias/app/tt/';

apiCtrl.get = (req, res, next)=> {
  const url = req.params.url;
  const query = querystring.stringify(req.query);

  axios.get(`${BASE_URL}${url}?${query}`, {responseType: 'arraybuffer'})
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      next(error);
    });

};

module.exports = apiCtrl;