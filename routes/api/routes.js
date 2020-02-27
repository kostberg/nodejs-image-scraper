const express = require('express')
const scraping = require('./scraping.js')
const router = express.Router()

router.get('/:query', async (req, res) => {
    await scraping(req.params.query).then(src => {
        if(src){
            res.status(200).json({img: src})
        } else {
            res.status(400).json({})
        }
    }).catch(error => {
        console.log(error)
        res.status(400).json({})
    })

})

router.get('/*', async (req, res) => {
    res.send("<h1>Make an api call to './:query'</h1>")
})

router.post('/', async (req, res) => {
    if(!req.body.query){
        res.status(400).json({ErrorMsg: "Make sure to use the right properties in post call"})
    } else {
        const src = await scraping(req.body.query)
        res.status(200).json({img: src})
    }
})

module.exports = router