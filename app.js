const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

const htmlIndex =()=>{
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Home</title>
</head>
<body>
    <header>
        <nav>
            <a href="/">Inicio</a>
            <a href="/usuarios">Usuarios json</a>
        </nav>
    </header>
    <main>
        <h1>Lista de Personajes</h1>
        <ul>
        ${usuarios.map(usuario => `<li>Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | País: ${usuario.lugarProcedencia}</li>`).join('')}
        </ul>
        <form action="/usuarios" method="post">
            <p>Nombre</p>
            <input type="text" id="nombre" name="nombre" required>
            <p>Edad</p>
            <input type="number" id="edad" name="edad" required>
            <p>País</p>
            <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
            <button type="submit">Agregar usuario</button>
        </form>
    </main>
    
</body>
</html>`};

app.get('/',(req, res)=>{
    res.send(htmlIndex())
});
app.get('/usuarios',(req, res)=>{
    res.json(usuarios)
});
app.post('/usuarios', (req, res)=>{
    const nuevoUsuario = {
        id:usuarios.length + 1,
        nombre:req.body.nombre,
        edad:req.body.edad,
        lugarProcedencia:req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
})

app.use('/', (req, res)=>{
    res.status(404).send(`Página no encontrada<br> <a href="/">Inicio</a>`)
})

app.listen(port,()=>{
    console.log(`El servidor está escuchando en el puerto http://localhost:${port}`)
});