const apiCtrl = {};
const axios = require('../lib/axios');
const iconv = require('iconv-lite');
const querystring = require('querystring');

const BASE_URL = 'http://cist.nure.ua/ias/app/tt/';

const URLS = {
  getTeachersStructure: 'P_API_PODR_JSON',
  getGroupsStructure: 'P_API_GROUP_JSON'
};

apiCtrl.get = (req, res, next)=> {
  const url = req.params.url;
  const query = querystring.stringify(req.query);

  axios.get(`${BASE_URL}${URLS[url]}?${query}`, {responseType: 'arraybuffer'})
    .then(function(response) {
      res.send(response.data);
    })
    .catch(function(error) {
      res.send({apiError: true, text: 'Cist error'});
    });
};

module.exports = apiCtrl;