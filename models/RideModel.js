const db = require('../config/db')

class RideModel {
    static async createRide(ride) {
        return db('ride').insert(ride)
    }

    static async updateRide(ride) {
        return db('ride')
            .update(ride)
            .where({ id: ride.id })
    }

    static async getAllRides() {
        return db('ride').select('id', 'passenger_id', 'driver_id', 'status', 'origin', 'destination', 'request_time')
    }

    static async getRideById(id) {
        return db('ride')
            .select('id', 'passenger_id', 'driver_id', 'status', 'origin', 'destination', 'request_time', 'start_time', 'end_time', 'price')
            .where({ id })
            .first()
    }
}

module.exports = RideModel