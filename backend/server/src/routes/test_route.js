

const { Router } = require('express');
const { response } = require('express');


const router = Router();

const test_route = (req, res = response) => {
 
    const query = req.query;


    res.json({
        resp: 'Logs Server -- Test API',
        ...query
    });
}


router.get('/', test_route);

module.exports = router;