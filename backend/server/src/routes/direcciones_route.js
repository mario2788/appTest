




const { Router } = require('express');
const { response } = require('express');

const { get_direcciones } = require('../api_postgres/direcciones/get_direcciones');
const { add_direcciones } = require('../api_postgres/direcciones/add_direccciones');
const { delete_direccciones } = require('../api_postgres/direcciones/delete_direccciones');

const router = Router();


const PostRutas = async (req, res = response) => {

    try {

        const update = await add_direcciones(req.body)

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

const DeleteRutas = async (req, res = response) => {

    try {
        const update = await delete_direccciones(req.body.id)

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

const GetRutas = async (req, res = response) => {

    try {
        const direcciones = await get_direcciones()

        res.json({
            resp: 'Server app',
            success: true,
            direcciones
        });

    } catch (error) {

        res.status(500).json({
            resp: 'Server app',
            success: false,
            error: error
        });
    }
}

router.post('/', PostRutas);
router.get('/', GetRutas);
router.delete('/', DeleteRutas);

module.exports = router;