const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

app.engine('tam', handlebars({
    extname: '.tam'
}));
app.set('view engine', 'tam');
app.set('views', path.join(__dirname, 'resource\\views'));

app.get('/', (req, res) => {

    res.render('home');
})
app.get('/tin-tuc', (req, res) => {
    res.render('news');
})
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
})