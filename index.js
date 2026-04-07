const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta 1 — Pagina de inicio
app.get('/', (req, res) => {
    res.send('El servidor está funcionando');
});

// Ruta 2 — Saludo con fecha
app.get('/saludo', (req, res) => {
    res.json({
        mensaje: '¡Bienvenido a mi primer servidor con Express!',
        fecha: new Date().toLocaleDateString('es-CO')
    });
});

// Ruta 3 — Suma por parametros en la URL
app.get('/sumar/:num1/:num2', (req, res) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({ error: 'Los dos valores deben ser números' });
        return;
    }

    res.json({ num1, num2, resultado: num1 + num2 });
});

// Ruta 4 — POST: recibe una lista de productos y devuelve un reporte en HTML
app.post('/reporte-productos', (req, res) => {
    const productos = req.body.productos;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        res.status(400).send('<h2>Error: debes enviar una lista de productos.</h2>');
        return;
    }

    let totalInventario = 0;
    let productoMasCaro = productos[0];
    let productoMasBarato = productos[0];

    for (let i = 0; i < productos.length; i++) {
        const p = productos[i];
        totalInventario += p.precio * p.cantidad;

        if (p.precio > productoMasCaro.precio) {
            productoMasCaro = p;
        }
        if (p.precio < productoMasBarato.precio) {
            productoMasBarato = p;
        }
    }

    const promedioPrecio = productos.reduce((acc, p) => acc + p.precio, 0) / productos.length;

    let filasHTML = '';
    for (let i = 0; i < productos.length; i++) {
        const p = productos[i];
        const subtotal = p.precio * p.cantidad;
        filasHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>$${p.precio.toLocaleString('es-CO')}</td>
                <td>${p.cantidad}</td>
                <td>$${subtotal.toLocaleString('es-CO')}</td>
            </tr>
        `;
    }

    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Reporte de Productos</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 40px auto;
                padding: 0 20px;
                background-color: #f4f4f4;
                color: #333;
            }
            h1 { color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 8px; }
            h3 { color: #555; margin-top: 30px; }
            table {
                width: 100%;
                border-collapse: collapse;
                background-color: white;
                margin-top: 10px;
            }
            th {
                background-color: #2c3e50;
                color: white;
                padding: 10px;
                text-align: left;
            }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            tr:hover { background-color: #f0f0f0; }
            .resumen {
                display: flex;
                gap: 16px;
                margin-top: 24px;
                flex-wrap: wrap;
            }
            .tarjeta {
                background: white;
                border-left: 5px solid #2c3e50;
                padding: 16px 20px;
                border-radius: 4px;
                flex: 1;
                min-width: 160px;
            }
            .tarjeta span { font-size: 22px; font-weight: bold; color: #2c3e50; }
            .tarjeta p { margin: 4px 0 0; font-size: 13px; color: #777; }
        </style>
    </head>
    <body>
        <h1>📦 Reporte de Inventario</h1>

        <h3>Productos recibidos</h3>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${filasHTML}
            </tbody>
        </table>

        <h3>Resumen</h3>
        <div class="resumen">
            <div class="tarjeta">
                <span>$${totalInventario.toLocaleString('es-CO')}</span>
                <p>Valor total del inventario</p>
            </div>
            <div class="tarjeta">
                <span>$${promedioPrecio.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</span>
                <p>Precio promedio</p>
            </div>
            <div class="tarjeta">
                <span>${productoMasCaro.nombre}</span>
                <p>Producto más caro</p>
            </div>
            <div class="tarjeta">
                <span>${productoMasBarato.nombre}</span>
                <p>Producto más barato</p>
            </div>
        </div>
    </body>
    </html>
    `;

    res.send(html);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});