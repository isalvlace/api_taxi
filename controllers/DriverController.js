const DriverModel = require('../models/DriverModel')

module.exports = app => {
    const { existsOrError } = app.controllers.ValidationController

    const save = async (req, res) => {
        const driver = { ...req.body }
        if (req.params.id) driver.id = req.params.id

        try {
            existsOrError(driver.name, 'Nome não informado')
            existsOrError(driver.car, 'Carro não informado')
            existsOrError(driver.phone, 'Telefone não informado')
            
            await DriverModel.createDriver(driver)
            
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save }
}