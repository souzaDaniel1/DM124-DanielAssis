const express = require('express');
const DeliveryService = require('../services/DeliveryService');
const checkAuth = require('../middleware/check-auth')
const notFound = require('../middleware/not-found');
const router = express.Router();

let db = {};
let sequence = 0;

router.post('/', checkAuth, async (request, response) => {
  const newDelivery = await DeliveryService.add(request.body);
  
  response.status(201).json(newDelivery);
});

router.get('/', async (request, response) => {
  const toArray = key => db[key];
  const deliveries = await DeliveryService.getAll();

  deliveries.length ? response.json(deliveries) : response.status(204).send();
});

router.get('/:deliveryId', async (request, response) => {
  const delivery = await DeliveryService.getById(request.params.deliveryId);

  delivery ? response.json(delivery) : notFound(request, response)
});

router.patch('/:deliveryId', checkAuth, async (request, response) => {
  const updatedDelivery = await DeliveryService.update(request.params.deliveryId, request.body);

  updatedDelivery ? response.json(updatedDelivery) : notFound(request, response);
});

router.delete('/:deliveryId', checkAuth, async (request, response) => {
  const isDeleted = await DeliveryService.delete(request.params.deliveryId);

  isDeleted ? response.end() : notFound(request, response);
});

module.exports = router;