const options = require('../../options/sqliteDB');
const knex = require('knex')(options);

const listOfMessages = async () => {
    try {
        const messages = await knex('messages')
                            .select('*');
                            return messages;
    } catch (error) {
        throw new Error("Error al listar los mensajes", error)
    }
}

const addMessage = async (message) => {
    try {
        knex('messages')
        .insert(message)
        .then(() => {
            return ("Mensaje agregado")
        }).catch(err => {
            throw new Error("Error al agregar el mensaje", err)
        }
        )
    } catch (error) {
        throw new Error("Error al agregar el mensaje", error)
    }
}

module.exports = { listOfMessages, addMessage }


/*const fs = require('fs')
const moment = require('moment')

class Message {
    constructor (file){
        this.file = file;
    }

    async save(message){
        try {
        if (fs.existsSync(this.file)) {
            const data = await fs.promises.readFile(this.file);
            const array = JSON.parse(data);
            message.date = moment().format('DD/MM/YYYY, h:mm:ss a');
            //console.log(message);
            array.push(message);
            await fs.promises.writeFile(this.file, JSON.stringify(array, null,2));
            //console.log('Se ha guardado el mensaje con la fecha: ' + message.date);
        } else {
            message.date = moment().format('DD/MM/YYYY, h:mm:ss a');
            await fs.promises.writeFile(this.file, JSON.stringify([object]));
            //console.log('Se ha guardado el objeto con la fecha: ' + message.date);
        }
        } catch (err) {
            throw new Error(err);
        }
    }
}

let messages = new Message('./public/messages.json');

const addMessage = (message) => {
    const msg = {
        author: message.author,
        text: message.text,
        date: message.date
    }
    messages.save(msg)
}

module.exports = { addMessage }*/