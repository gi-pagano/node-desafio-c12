const { options } = require ('../../options/mariaDB.js')
const knex = require('knex')(options)

knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name')
    table.decimal('price', 10, 2)
    table.string('thumbnail')
    }).then(() => {
    console.log('Tabla creada')
    }).catch (err => {
    console.log(err)
    }).finally(() => {
    knex.destroy()
    })

    knex('products').insert([
    {
        "name": "Taza",
        "price": 1200,
        "thumbnail": "https://cdn2.iconfinder.com/data/icons/valentine-day-16/512/574_Cup_Coffee_Tea_Love_valentine_valentines_day_love-256.png",
    },
    {
        "name": "Vela",
        "price": 2100,
        "thumbnail": "https://cdn2.iconfinder.com/data/icons/valentine-day-16/512/700_candle_love_heart_wedding_valentine_valentines_day_love-256.png",
    },
    {
        "name": "Florero",
        "price": 3300,
        "thumbnail": "https://cdn2.iconfinder.com/data/icons/valentines-day-flat-line-1/59/heart-flower-vase-256.png",
    }
    ]).then(() => {
    console.log('Productos insertados')
    })
    .catch(err => {
    console.log(err)
    }).finally(() => {
    knex.destroy()
})