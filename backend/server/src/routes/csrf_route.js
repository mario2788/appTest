
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {

    res.json({ csrfToken: req.cookies[process.env.NAME_COOKIE] });

    console.log('Solicitud de token satisfecha, token:', req.cookies[process.env.NAME_COOKIE]);
});

module.exports = router;
