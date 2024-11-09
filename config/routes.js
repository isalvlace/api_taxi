const admin = require('./admin')

function setupAuthRoutes(app) {
    app.post('/signup', app.controllers.UserController.save)
    app.post('/signin', app.controllers.AuthController.signin)
    app.post('/validateToken', app.controllers.AuthController.validateToken)
}

function setupUserRoutes(app) {
    const authenticate = app.config.passport.authenticate()
    
    app.route('/user')
        .all(authenticate)
        .post(admin(app.controllers.UserController.save))
        .get(admin(app.controllers.UserController.get))

    app.route('/user/:id')
        .all(authenticate)
        .put(admin(app.controllers.UserController.save))
        .get(admin(app.controllers.UserController.getById))
        .delete(admin(app.controllers.UserController.remove))

    app.route('/drivers')
        .post(app.controllers.DriverController.save)
    
    app.route('/passengers')
        .post(app.controllers.PassengerController.save)

    app.route('/rides')
        .post(app.controllers.RideController.create)
        .patch(app.controllers.RideController.update)
    
    app.route('/rides/:id')
        .get(app.controllers.RideController.getById)
}

function configureRoutes(app) {
    setupAuthRoutes(app)
    setupUserRoutes(app)
}

module.exports = configureRoutes
