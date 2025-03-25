import {agregarProducto, mostrarLista} from './compras.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form-compra');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const precioUnitario = parseFloat(document.getElementById('precio').value);

        if (nombre && precioUnitario > 0) {
            const producto = { nombre, precioUnitario};
            agregarProducto(producto);
        }
    });

    mostrarLista();
});