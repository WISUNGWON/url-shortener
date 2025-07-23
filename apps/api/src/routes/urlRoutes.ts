import { Router } from 'express';
import UrlController from '../controllers/UrlController';

const router: Router = Router();

router.post('/shorten', UrlController.shortenUrl);

router.get('/api/url/:shortKey', UrlController.getOriginalUrl);

router.get('/:shortKey', UrlController.redirectUrl);

export default router;