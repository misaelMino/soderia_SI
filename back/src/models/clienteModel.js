class Cliente {
    constructor(IdCliente, Nombre, Apellido, Direccion, IdTipoDoc, DNI, Telefono, FechaDeAlta, IdBarrio) {
        this.IdCliente = IdCliente;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Direccion = Direccion;
        this.idTipoDoc = IdTipoDoc;
        this.DNI = DNI;
        this.Telefono = Telefono;
        this.FechaDeAlta = FechaDeAlta;
        this.IdBarrio = IdBarrio;
    }
}

module.exports = Cliente;
