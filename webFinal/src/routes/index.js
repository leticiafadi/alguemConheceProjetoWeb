import { Router } from 'express';
import servicesRoutes from './services.routes.js';

const routes = Router();

routes.use('/services', servicesRoutes);

export default routes;