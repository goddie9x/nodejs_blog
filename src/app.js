const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
/* app.use(morgan('combined')); */

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.engine('tam', handlebars({
    extname: '.tam'
}));
app.set('view engine', 'tam');
app.set('views', path.join(__dirname, 'resource\\views'));

//Route
route(app);
/* 
app.post('/search', (req, res) => {
    console.log(req.body);
    res.render('search');
}); */

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});