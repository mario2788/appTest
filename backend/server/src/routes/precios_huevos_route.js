

const { Router } = require('express');
const { response } = require('express');
const { get_precios } = require('../api_postgres/precios/get_precios');

const router = Router();


const GetPrecios = async (req, res = response) => {


    try {
        const precios = await get_precios()

        res.json({
            resp: 'Server app',
            success: true,
            precios
        });

    } catch (error) {

        res.status(500).json({
            resp: 'Server app',
            success: false,
            error: error
        });
    }

}

router.get('/', GetPrecios);

module.exports = router;