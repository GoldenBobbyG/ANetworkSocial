import { Router } from 'express';
import apiRoutes from './api/index.js';
//
// Import all routes from the api folder
const router = Router();
// Import all routes from the api folder
router.use('/api', apiRoutes);
// If no API routes are hit, send the following response
router.use((_req, res) => {
    return res.send('Wrong route Buddy!');

});

export default router;