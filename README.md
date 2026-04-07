# Servidor Web - Node.js y Express

Servidor web básico con **Node.js** y **Express** como proyecto de aprendizaje.

## Tecnologías

- Node.js - Express - Nodemon

## Correr localmente

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd servidor_node
npm install
npm run dev
```

Servidor en `http://localhost:3000`

## Despliegue

Disponible en: **https://servidor-node-6vql.onrender.com**

> ⚠️ El plan gratuito de Render tiene las siguientes limitaciones:
> - El servidor se **duerme** tras 15 minutos sin peticiones (la primera puede tardar ~60 seg).
> - 750 horas de uso al mes.
> - 512 MB de RAM.

## Rutas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Verifica que el servidor esté activo |
| GET | `/saludo` | Retorna mensaje y fecha actual en JSON |
| GET | `/sumar/:num1/:num2` | Suma dos números de la URL |
| POST | `/reporte-productos` | Recibe lista de productos y retorna reporte en HTML |

### POST /reporte-productos - Body de ejemplo

```json
{
  "productos": [
    { "nombre": "Teclado", "precio": 85000, "cantidad": 10 },
    { "nombre": "Mouse", "precio": 45000, "cantidad": 25 }
  ]
}
```
