import { Router } from 'express';
const { uuid } = require('uuidv4');
// Importação do uuid do index.

const servicesRoutes = Router();

const services = [];

// Todas as rotas criadas no index.
servicesRoutes.get('/services', (request, response) => {
    const { category } = request.query;
  
    const result = category
      ? services.filter(services => services.category.includes(category))
      : services;
  
    return response.json(result);
  });

servicesRoutes.post('/services', (request, response) => {
    const { name, price, amount, category } = request.body;
  
    const newService = {
      id: uuidv4(),
      name,
      price,
      amount,
      category
    }
  
    services.push(newService);
  
    return response.status(201).json(newService);
  });

  servicesRoutes.put('/services/:id', (request, response) => {
    const { id } = request.params;
    const { name, price, amount, category } = request.body;
  
    const indexService = services.findIndex(p => p.id === id);
  
    if (indexService < 0) {
      return response.status(404).json({ error: "Serviço não encontrado." });
    }
  
    const editedService = {
      id,
      name,
      price,
      amount,
      category
    }
  
    services[indexService] = editedService;
  
    return response.json(editedService);
  });

  servicesRoutes.delete('/services/:id', (request, response) => {
    const { id } = request.params;
  
    const indexService = services.findIndex(p => p.id === id);
  
    if (indexService < 0) {
      return response.status(404).json({ error: "Serviço não encontrado." })
    }
  
    services.splice(indexService, 1);
  
    return response.status(204).send();
  });

export default servicesRoutes;