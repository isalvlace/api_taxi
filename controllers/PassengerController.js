const PassengerModel = require('../models/PassengerModel')

module.exports = app => {
    const { existsOrError } = app.controllers.ValidationController

    const save = async (req, res) => {
        const passenger = { ...req.body }
        if (req.params.id) passenger.id = req.params.id

        try {
            existsOrError(passenger.name, 'Nome não informado')
            existsOrError(passenger.phone, 'Telefone não informado')
            
            await PassengerModel.createPassenger(passenger)

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save }
}