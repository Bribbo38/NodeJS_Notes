const isAdministrator = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        if(req.session.user.role === 'admin'){
            next();
        } else {
            res.render('error', {
                error: {status: 401, message: 'Unauthorized'},
                message: 'The page you tried to access need special permissions.',
                user: req.session.user
            });
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = isAdministrator;