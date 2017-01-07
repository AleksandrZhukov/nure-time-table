import { version } from '../../package.json';
import { Router } from 'express';
import cistProxy from './cist-proxy';

const router = Router();

router.get('/', (req, res) => {
  res.json({ version: version });
});

router.use('/api/:url', cistProxy);

export default router;
