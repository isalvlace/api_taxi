const db = require('../config/db')

class PassengerModel {
    static async createPassenger(passenger) {
        return db('passenger').insert(passenger)
    }

    static async getPassengerById(id) {
        const passenger = await db('passenger').where({ id }).first()

        return passenger
    }
}

module.exports = PassengerModel