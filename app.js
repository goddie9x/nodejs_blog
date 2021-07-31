const express = require('express')
const app = express()
const port = 3000

app.get('/tin-tuc', (req, res) => {
    a = 1;
    b = 2;
    c = a + b;
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})