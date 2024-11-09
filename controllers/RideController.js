const RideModel = require('../models/RideModel')
const PassengerModel = require('../models/PassengerModel')
const DriverModel = require('../models/DriverModel')


module.exports = app => {
    const { existsOrError } = app.controllers.ValidationController

    const create = async (req, res) => {
        const ride = { ...req.body }

        try {
            existsOrError(ride.passenger_id, 'Passageiro não informado')
            existsOrError(ride.origin, 'Origem não informada')
            existsOrError(ride.destination, 'Destino não informado')

            const passenger = await PassengerModel.getPassengerById(ride.passenger_id)
            existsOrError(passenger, 'Passageiro não encontrado')
            
            ride.status = 'requested'
            ride.request_time = new Date()

            await RideModel.createRide(ride)

            res.status(201).send('Corrida criada com sucesso!')
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const update = async (req, res) => {
        const { id, status, driver_id, price } = req.body
    
        try {
            existsOrError(id, 'ID da corrida não informado')
            existsOrError(status, 'Status não informado')
            existsOrError(driver_id, 'ID do motorista não informado')
    
            const driver = await DriverModel.getDriverById(driver_id)
            existsOrError(driver, 'Motorista não encontrado')
    
            const ride = await RideModel.getRideById(id)
            existsOrError(ride, 'Corrida não encontrada')
    
            if (status === 'started') {
                if (ride.status !== 'requested') {
                    throw 'A corrida precisa estar no estado "requested" para ser iniciada'
                }
                ride.start_time = new Date()
                ride.driver_id = driver_id  
            }
    
            if (status === 'completed') {
                if (ride.status !== 'started') {
                    throw 'A corrida precisa estar no estado "started" para ser finalizada'
                }
                ride.end_time = new Date()
            }
    
            ride.status = status
            ride.price = price
    
            await RideModel.updateRide(ride)
    
            res.status(200).send('Status da corrida atualizado com sucesso!')
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const getById = async (req, res) => {
        try {
            const ride = await RideModel.getRideById(req.params.id)
            res.json(ride)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    return { create, update, getById }
}