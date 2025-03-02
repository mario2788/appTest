

const makeCookieCSRF = (csrfProtection) => {
    return (req, res, next) => {

        // Genera un nuevo token si no existe
        if (!req.cookies[process.env.NAME_COOKIE]) {

            const token = csrfProtection.create(process.env.CSRF_SECRET);
            res.cookie(process.env.NAME_COOKIE, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            });
        }
        next();
    }
}

module.exports = {
    makeCookieCSRF
}