const express = require('express');
const router = express.Router();

const TaskService = require('../services/TaskService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');

router.post('/', checkAuth, async (request, response) => {
  const task = await TaskService.add(request.body);
  response
    .status(201)
    .json(task);
});

router.get('/', async (request, response) => {
  const tasks = await TaskService.getAll();
  tasks && tasks.length
    ? response.json(tasks)
    : response.status(204).end();
});

router.get('/:taskId', async (request, response) => {
  const task = await TaskService.getById(request.params.taskId);
  task
    ? response.json(task)
    : notFound(request, response);
});

router.patch('/:taskId', async (request, response) => {
  const updatedTask = await TaskService.update(
    request.params.taskId,
    request.body
  );
  updatedTask
    ? response.json(updatedTask)
    : notFound(request, response);
});

router.delete('/:taskId', async (request, response) => {
  const isDeleted = await TaskService.delete(request.params.taskId);
  isDeleted
    ? response.end()
    : notFound(request, response)
});

module.exports = router;