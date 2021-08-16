const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const userRouter = require('./user');

function route(app) {
    app.use('/me', userRouter);
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;