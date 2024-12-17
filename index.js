const express = require('express');


const app = Express();

app.get('/', (req, res) => {
    res.send('Hello wrld');
});

app.listen(4000, () => {
    console.log(`app listening on 4000 at "localhost:4000"`)
})