const socket = io.connect();

let html = ``

function render(datos) {
    if (datos.length === 0) {
        html = `<tr>
        <td colspan="3">
            <center>No hay productos</center>
        </td>
    </tr>`
    } else {
        html = ``
        datos.forEach(producto => {
            html += `<tr>
            <td>${producto.name}</td>
            <td>${producto.price}</td>
            <td><img src='${producto.thumbnail}' alt="thumbnail" class="img-thumbnails" ></td>
        </tr>`
        });
    }

    let tabla = `
    <table class="table" style="margin: 0 auto; width: 50%;">
        <thead>
            <tr>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Thumbnail</th>
            </tr>
        </thead>
        <tbody>
            ${html}
        </tbody>
    </table>

    <style>
    .table {
        color: #F7D4BC;
    }
    th {
        color:#F7D4BC;
        font-weight: bold;
    }
    td {
        color: #f5f5f5;
    }
    img {
        width: 100px;
    }
    </style>
    `
    document.getElementById('tabla').innerHTML = tabla;
}

function renderMessages(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong style="color:blue;">${elem.author}</strong> <span style="color:red;">[${elem.date}]</span>:
            <em style="color:green">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        date: new Date().toLocaleDateString("es-ES")
    };
    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = '';
    return false;
}


// Mostrar mensajes

socket.on('messages', data => renderMessages(data) );

// Mostrar productos

socket.on('tabla', datos => {
    fetch('products.json')
        .then(response => response.json())
        .then(render(datos))
        .catch(error => console.log(error))
});
