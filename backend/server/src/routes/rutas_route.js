



const { Router } = require('express');
const { response } = require('express');
const { get_rutas } = require('../api_postgres/rutas/get_rutas');
const { add_ruta } = require('../api_postgres/rutas/add_ruta');
const { delete_ruta } = require('../api_postgres/rutas/delete_ruta');

const router = Router();


const PostRutas = async (req, res = response) => {

    try {

        const update = await add_ruta(req.body)

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
        const update = await delete_ruta(req.body)

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
        const rutas = await get_rutas()

        res.json({
            resp: 'Server app',
            success: true,
            rutas
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