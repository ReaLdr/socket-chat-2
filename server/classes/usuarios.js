class Usuarios {
    constructor (){
        this.personas = [];
    }

    // Métodos
    agregarPersonas( id, nombre ){
        let persona = { id, nombre };

        console.log('DESDE AGREGARPERSONAS');
        console.log(persona);

        this.personas.push(persona);

        return this.personas;
    }

    getPersona( id ){
        // let persona = this.personas.filter( persona =>{
        //     return persona.id === id;
        // })[0];
        
        let persona = this.personas.filter( persona => persona.id = id)[0];
        // Es lo mismo
        console.log('getPersona');
        console.log(persona);
        return persona;
    }

    getPersonas ( ){
        return this.personas;
    }

    getPersonasPorSala( sala ){
        // TODO
    }

    borrarPersona( id ){
        let personaBorrada = this.getPersona( id );
        // this.personas = this.personas.filter( persona =>{
        //     return persona.id != id;
        // });
        this.personas = this.personas.filter( persona => persona.id != id );
        return personaBorrada;
    }
}


module.exports = {
    Usuarios
}