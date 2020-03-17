const { Router } = require('express');
const UsersController = require('./app/controllers/UsersController');
// const CoursesController = require('./app/controllers/CoursesController');
const SessionController = require('./app/controllers/SessionController');
const AuthMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.get('/');

// routes.get('/users');
routes.post('/user', UsersController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.put('/user', UsersController.update);
routes.delete('/user');

// routes.get('/courses');
// routes.post('/course', CoursesController.store);
// routes.put('/course', CoursesController.update);
// routes.delete('/course');

module.exports = routes;
