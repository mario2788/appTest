

const { Router } = require('express');
const { response } = require('express');
const { update_precios } = require('../api_postgres/precios/update_precios');


const router = Router();


const PostUpdatePrecios = async (req, res = response) => {

    try {
        console.log("PostUpdatePrecios ::", req.body);
        const update = await update_precios(req.body)

        res.json({
            resp: 'Server app',
            success: true,
            update
        });

    } catch (error) {

        res.status(500).json({
            resp: 'Server app',
            success: false,
            error: error
        });
    }
}

router.post('/', PostUpdatePrecios);

module.exports = router;