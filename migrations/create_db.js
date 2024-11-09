/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .dropTableIfExists('ride')
        .dropTableIfExists('passenger')
        .dropTableIfExists('driver')
        .dropTableIfExists('user') 
        .then(function () {
            return knex.schema.createTable('user', function (table) {
                table.increments('id').primary()
                table.string('username').notNullable().unique()
                table.string('password').notNullable()
                table.string('email').notNullable().unique()
                table.boolean('is_admin').defaultTo(false)
                table.timestamp('created_at').defaultTo(knex.fn.now())
                table.timestamp('deleted_at').nullable()
            })
        })
        .then(function () {
            return knex.schema.createTable('passenger', function (table) {
                table.increments('id').primary()
                table.string('name', 255).notNullable()
                table.string('phone', 20).notNullable()
            })
        })
        .then(function () {
            return knex.schema.createTable('driver', function (table) {
                table.increments('id').primary()
                table.string('name', 255).notNullable()
                table.string('car', 255).notNullable()
                table.string('phone', 20).notNullable()
            })
        })
        .then(function () {
            return knex.schema.createTable('ride', function (table) {
                table.increments('id').primary()
                table.integer('passenger_id').unsigned().notNullable() 
                table.integer('driver_id').unsigned().nullable() 
                table.enu('status', ['requested', 'started', 'completed']).notNullable()
                table.string('origin', 255).notNullable()
                table.string('destination', 255).notNullable()
                table.timestamp('request_time').notNullable()
                table.timestamp('start_time').nullable()
                table.timestamp('end_time').nullable()
                table.decimal('price', 8, 2).nullable()
                table.foreign('passenger_id').references('id').inTable('passenger').onDelete('CASCADE')
                table.foreign('driver_id').references('id').inTable('driver').onDelete('CASCADE')
            })
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('ride')
        .dropTableIfExists('driver')
        .dropTableIfExists('passenger')
        .dropTableIfExists('user')
}