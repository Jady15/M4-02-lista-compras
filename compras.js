// compras.js
let listaDeCompras = [];

const agregarProducto = (producto) => {
    const productoExistente = listaDeCompras.find((item) => item.nombre === producto.nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;

        // Se actualiza el precio del formulario al precio unitario del producto ya registrado
        const formPrecio = document.getElementById('precio');
        formPrecio.value = productoExistente.precioUnitario.toFixed(2);
    } else {
        // Inicializando la cantidad del nuevo producto en 1
        const nuevoProducto = {
            ...producto,
            cantidad: 1
        };

        // Añade el nuevo producto a la lista
        listaDeCompras.push(nuevoProducto);
    }

    mostrarLista();
};

const eliminarProducto = (nombre) => {
    const producto = listaDeCompras.find((item) => item.nombre === nombre);
    if (producto) {
        // Si hay más de una unidad del producto a eliminar, solo se resta la cantidad
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {    // Si solo hay una unidad, se elimina el producto de la lista
            listaDeCompras = listaDeCompras.filter((item) => item.nombre !== nombre);
        }
        mostrarLista();
    }
};

const mostrarLista = () => {
    const contenedor = document.getElementById('lista-compras');
    contenedor.innerHTML = ''; // Limpiar el contenedor

    if (listaDeCompras.length === 0) {
        contenedor.innerHTML = '<p>La lista de compras está vacía</p>';
        return;
    }

    let totalGeneral = 0;

    // Mostrar cada producto en el HTML
    listaDeCompras.forEach(item => {
        const totalPorProducto = (item.precioUnitario * item.cantidad);
        const elemento = document.createElement('div');
        elemento.className = 'producto';
        elemento.innerHTML = `
            <p><strong>Producto:</strong> ${item.nombre}</p>
            <p><strong>Cantidad:</strong> ${item.cantidad}</p>
            <p><strong>Precio Unitario:</strong> $${item.precioUnitario.toFixed(2)}</p>
            <p><strong>Total:</strong> $${totalPorProducto.toFixed(2)}</p>
            <button class="btn-eliminar" data-nombre="${item.nombre}">Eliminar</button>
        `;
        contenedor.appendChild(elemento);
        totalGeneral += totalPorProducto;
    });

    // Añadir el total general
    const totalElement = document.createElement('p');
    totalElement.className = 'total';
    totalElement.innerHTML = `<strong>Total General:</strong> $${totalGeneral.toFixed(2)}`;
    contenedor.appendChild(totalElement);

    // Añadir event listeners a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', () => {
            const nombre = button.getAttribute('data-nombre');
            eliminarProducto(nombre);
        });
    });
};

export { agregarProducto, eliminarProducto, mostrarLista };