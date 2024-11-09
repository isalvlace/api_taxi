const db = require('../config/db')

class DriverModel {
    static async createDriver(driver) {
        return db('driver').insert(driver)
    }

    static async getDriverById(id) {
        return db('driver')
            .select('id', 'name', 'car', 'phone')
            .where({ id })
            .first()
    }
}

module.exports = DriverModel