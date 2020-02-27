const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use('/api/scrape', require('./routes/api/routes'))

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))