import { Router } from 'express';
import axios from '../lib/cist-axios';
import querystring from 'querystring';

const URLS = {
  getTeachersStructure: 'P_API_PODR_JSON',
  getGroupsStructure: 'P_API_GROUP_JSON'
};

export default (req, res, next) => {
  const url = req.params.url;
  const query = querystring.stringify(req.query);

  axios.get(`${URLS[url]}?${query}`, { responseType: 'arraybuffer' })
    .then(response => { res.json(response.data); })
    .catch(error => {
      res.status(404).json({ apiError: true, text: error.data });
    });
}
