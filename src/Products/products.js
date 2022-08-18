const { options } = require ('../../options/mariaDB.js')
const knex = require('knex')(options)

const listOfProducts = async () => {
    try {
        const products = await knex
        .from('products')
        .select('*')
        .orderBy('price', 'desc')
        return products
    } catch (error) {
        throw new Error("Error al listar los productos", err)
    }
}

const addProduct = async (product) => {
    try {
        knex('products')
        .insert(product)
        .then(() => {
            return ("Producto agregado")
            }).catch(err => {
                throw new Error("Error al agregar el producto", err)
            }
        )
    } catch (error) {
        throw new Error("Error al agregar el producto", error)
    }
}

const getProduct = async (id) => {
    try {
        const product = await knex
        .from('products')
        .select('*')
        .where({id})
        .then((product) => {
            return product;
            }).catch(err => {
                throw new Error("Error al obtener el producto", err)
            }
        )
    } catch (error) {
        throw new Error("Error al obtener el producto", error)
    }
}

const deleteProduct = async (id) => {
    try {
        knex
        .from('products')
        .select('*')
        .where('id', '=', id)
        .del()
        .then (() => { 
            return('Producto eliminado'); 
            }).catch(err => {
                throw new Error("Error al eliminar el producto", err)
            }
        )
    } catch (error) {
        throw new Error("Error al eliminar el producto", error)
    }
}

module.exports = { listOfProducts, getProduct, addProduct, deleteProduct }




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

let id = 1


class Contenedor {
  //Add object
    save (object) {
        knex('products').insert({object})
    }
}

const listOfProducts = () => {
    knex('products')
        .select('*')
        .orderBy('id', 'asc')
        .then(products => {
            return products
        })
        .catch(err => {
            console.log(err)
        })
}

const getProduct = (id) => {
    return knex('products')
        .select('*')
        .where('id', id)
        .then(product => {
        return product
        })
        .catch(err => {
        console.log(err)
        })
}

const addProduct = (product) => {
    const prod = {
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail
    }
    Contenedor.save(prod)
}

const updateProduct = (id, newContent) => {
    const product = getProduct(parseInt(id))
    if ((product.id == id) && (product.id != null)) {
        product.name = newContent.name
        product.price = newContent.price
        product.thumbnail = newContent.thumbnail
        knex('products')
        .where('id', id)
        .update(product)
        return product
    } else {
        return 'Producto no encontrado'
    }
}

const deleteProduct = (id) => {
    const product = getProduct(parseInt(id))
    if ((product.id == id) && (product.id != null)) {
        knex('products')
        .where('id', id)
        .del()
        return 'Producto eliminado'
    } else {
        return 'Producto no encontrado'
    }
}

module.exports = { listOfProducts, getProduct, addProduct, updateProduct, deleteProduct }*/

