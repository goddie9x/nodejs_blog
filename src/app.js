const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const sortMiddleware = require('./app/middlewares/SortMiddleware');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));
/* app.use(morgan('combined')); */

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.engine(
    'tam',
    handlebars({
        extname: '.tam',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field == sort.column ? sort.type : 'default';

                const classTypes = {
                    default: '',
                    asc: 'asc',
                    desc: 'desc',
                }
                const types = {
                    asc: 'desc',
                    desc: 'asc',
                    default: 'desc',
                }

                classType = classTypes[sortType];
                nextType = types[sortType];

                return `href="?_sort&column=${field}&type=${nextType}" class="${classType} ms-3"`;
            }
        },
    }),
);

app.set('view engine', 'tam');
app.set('views', path.join(__dirname, 'resource', 'views'));

app.use(methodOverride('_method'));

//use custom middlewares
app.use(sortMiddleware);
//Route
route(app);