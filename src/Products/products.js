/*const products = [
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
]

let id = 1*/

const fs = require('fs')
const products = require('../../public/products.json')

class Contenedor {
    constructor (file){
        this.file = file;
    }

    async save(object){
        try {
            if (fs.existsSync(this.file)) {
                const data = await fs.promises.readFile(this.file);
                const array = JSON.parse(data);
                object.id = array.length + 1;
                array.push(object);
                await fs.promises.writeFile(this.file, JSON.stringify(array, null,2));
                //console.log('Se ha guardado el objeto con el id: ' + object.id);
            } else {
                object.id = 1;
                await fs.promises.writeFile(this.file, JSON.stringify([object]));
                //console.log('Se ha guardado el objeto con el id: ' + object.id);
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

let contenedor = new Contenedor('./public/products.json');

const listOfProducts = () => {
    return products
}

const getProduct = (id) => {
    return (products.find(product => product.id === parseInt(id)) || { error: 'Producto no encontrado' })
}

const addProduct = (product) => {
    const prod = {
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail
    }
    contenedor.save(prod)
}

const updateProduct = (id, newContent) => {
    const product = getProduct(parseInt(id))
    if ((product.id == id) && (product.id != null)) {
        product.name = newContent.name
        product.price = newContent.price
        product.thumbnail = newContent.thumbnail
        return product
    } else {
        return 'Producto no encontrado'
    }
}

const deleteProduct = (id) => {
    const product = getProduct(parseInt(id))
    if ((product.id == id) && (product.id != null)) {
        products.splice(products.indexOf(product), 1)
        return 'Producto eliminado'
    } else {
        return 'Producto no encontrado'
    }
}

module.exports = { listOfProducts, getProduct, addProduct, updateProduct, deleteProduct }