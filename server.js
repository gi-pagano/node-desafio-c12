const express = require('express')
const app = express()
const PORT = 8080

const { Server: IOServer } = require('socket.io')
const { Server: HTTPServer } = require('http')

const router = require('./src/Routes/routes.js')

const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

const datos = require('./src/Products/products.js').listOfProducts()
const messages = require('./public/messages.json')
const MessagesActions = require('./src/Controller/msgController').MessagesActions

//middleware
app.set('views', 'public');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', router)
app.use('/message', router)
app.get('/', (req, res) => {
    res.render('index', {datos});
})



// Server conectado
httpServer.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${PORT}`))

io.on('connection', socket => {
    console.log('Cliente conectado')
    socket.emit('tabla', datos);
    socket.emit('messages', messages);
    socket.on('new-message', data => {
        messages.push(data);
        MessagesActions.add(data);
        io.sockets.emit('messages', messages);
    }
    )
});
