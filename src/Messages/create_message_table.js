const options = require('../../options/sqliteDB');
const knex = require('knex')(options);

knex.schema.createTable('messages', (table) => {    
    table.increments('id');
    table.string('author'); 
    table.string('date'); 
    table.string('text');   
    }).then (() => {
    console.log('Tabla creada');  
    }).catch((err) => {
    console.log(err);
    }).finally (() => {
    knex.destroy(); 
})