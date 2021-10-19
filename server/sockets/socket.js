const { Usuarios } = require('../classes/usuarios');
const { io } = require('../server');
const { crearMensaje } = require('../utils/utilidades');


const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) =>{
        if (!data.nombre){
            return callback({
                error: true,
                msg: 'El nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersonas( client.id, data.nombre );

        client.broadcast.emit('listaPersonas', usuarios.getPersonas());

        callback( personas );
    });

    client.on('crearMensaje', (data) =>{

        let persona = usuarios.getPersona( client.id );

        console.log(persona);
        
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        
        client.broadcast.emit( 'crearMensaje', mensaje );
    })

    client.on('disconnect', () =>{


        let personaBorrada = usuarios.borrarPersona( client.id );
        client.broadcast.emit('crearMensaje',  crearMensaje('Administrador', `${personaBorrada} abandonó el chat`));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
    });

    // Mensajes privados
    client.on('mensajePrivado', data =>{
        let persona = usuarios.getPersona( client.id );
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ));
    })

});