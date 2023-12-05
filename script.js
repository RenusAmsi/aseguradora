let todasMarcasModelos = [
    [],
    ["-", "Etios", "Corolla", "Yaris", "Hilux", "SW4", "Hiace"],
    ["-", "Cronos", "Pulse", "Strada", "Toro", "Fiorino", "Ducato"],
    ["-", "Logan", "Kangoo", "Sandero", "Stepway", "Oroch", "Duster"],
    ["-", "Polo", "Virtus", "Vento", "Saveiro", "Amarok ", "T-Cross"],
    ["-", "208", "Partner", "Boxer", "Expert", "SUV 3008 ", "Partener Patagonica"],
    ["-", "Cruze", "Onix", "Tracker", "S10", "Camaro ", "Joy"],
    ["-", "Bronco", "F-150", "Ranger", "Mustang", "Maverick ", "Transit Van"],
    ["-", "Sentra", "Frontier", "Leaf MY23", "Versa", "X-Trail ", "Kick MY23"],
    ["-", "C3", "C4 Cactus", "C5 AirCross", "Berlingo", "Jumper ", "Jumpy"],
    ["-", "Renegade", "Compass", "Wrangler", "Gladiator", "Commander ", "Grand Cherokee"],
];

class Vehiculo {
    constructor(patente, tipo, anio, marca, modelo, gnc, descripcion) {
        this.patente = patente;
        this.tipo = tipo;
        this.anio = anio;
        this.marca = marca;
        this.modelo = modelo;
        this.gnc = gnc;
        this.descripcion = descripcion;
    }
}

class Cliente {
    constructor(cuit, nombreCompleto, telefono, email, vehiculos) {
        this.cuit = cuit;
        this.nombreCompleto = nombreCompleto;
        this.telefono = telefono;
        this.email = email;
        this.vehiculos = vehiculos || [];
    }
}

var listaClientes = [];

var formulario = document.querySelector("form");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let cliente, auto;
    let cuit = evento.target.cuit.value.replace(/[^\d]/g, '');
    let nombre = evento.target.nombre.value.trim();
    let apellido = evento.target.apellido.value.trim();
    let tel = evento.target.telefono.value;
    let email = evento.target.email.value;
    let patente = evento.target.patente.value;
    let tipoAuto = evento.target.tipoAuto.value;
    let anio = evento.target.anio.value;
    let marcaSelect = evento.target.marca;
    let marca = marcaSelect.options[marcaSelect.selectedIndex].text;
    let modelo = evento.target.modelo.value;
    let gnc = evento.target.gnc.checked;
    let descrp = evento.target.descripcion.value;
    if (nombre.length < 2 && apellido.length < 2) {
        return alert("El campo nombre y apellido requiere más de 2 caracteres.")
    }
    else if (!verificarCuit(cuit)) {
        return alert("El CUIT ingresado es inválido.")
    }
    else if (!validarTelefono(tel)) {
        return alert("El telefono no es válido.")
    }
    else if (!validarCorreoElectronico(email)) {
        return alert("El correo electronico no es válido.")
    }
    else if (anio > (new Date).getFullYear()) {
        return alert("El año ingresado no es válido.")
    }
    else if (!validarMatriculaVehicular(patente)) {
        return alert("La matricula no es válido.")
    }
    else if ((verificarExistenciaPatente(patente)) ) {
        alert("La matricula ya exista registrada.")
    }
    else {
        let nomCompleto = nombre + " " + apellido;
        cliente = buscarCliente(cuit);
        auto = new Vehiculo(patente, tipoAuto, anio, marca, modelo, gnc, descrp);
        cliente.nombreCompleto = nomCompleto;
        cliente.telefono = tel;
        cliente.email = email;
        cliente.vehiculos.push(auto);
        if (cliente.cuit == '') {
            cliente.cuit = cuit;
            listaClientes.push(cliente);
        }
        alert("Se cargo correctamente");
        cargarTablas();
    }
});

function verificarExistenciaPatente(patente) {
    for (let i = 0; i < listaClientes.length; i++) {
        for (let j = 0; j < listaClientes[i].vehiculos.length; j++) {
            if (listaClientes[i].vehiculos[j].patente === patente) {
                return true; 
            }
        }
    }
    return false; 
}


function buscarPorCuit() {
    let cuit = document.getElementById('cuitForm').value;
    let cliente = buscarCliente(cuit);
    if (cliente.cuit != "") {
        let name = cliente.nombreCompleto.split(' ');
        document.getElementById('nombre').value = name[0];
        document.getElementById('apellido').value = name[1];
        document.getElementById('telefono').value = cliente.telefono;
        document.getElementById('email').value = cliente.email;
    }
}

function cambia_modelo() {
    var marca;
    marca = document.getElementById("marca-auto");
    marca = marca.options[marca.selectedIndex].value;
    console.log(marca);
    if (marca != 0) {
        mis_modelos = todasMarcasModelos[marca];
        num_modelos = mis_modelos.length;
        document.formCliente.modelo.length = num_modelos;
        for (i = 0; i < num_modelos; i++) {
            document.formCliente.modelo.options[i].value = mis_modelos[i];
            document.formCliente.modelo.options[i].text = mis_modelos[i];
        }
    } else {
        document.formCliente.modelos.length = 1;
        document.formCliente.modelos.options[0].value = "-";
        document.formCliente.modelos.options[0].text = "-";
        document.formCliente.modelos.options[0].selected = true;
    }
}

function buscarCliente(cuit) {
    for (let cliente of listaClientes) {
        if (cliente.cuit == cuit.replace(/[^\d]/g, '')) {
            return cliente;
        }
    }
    return new Cliente("", "", "", "", []);
}

function ObtenerValorRadio() {
    var seleccionado = document.querySelector("input[type=radio][name=tipoAuto]:checked");
    return seleccionado = seleccionado.value;

}

function verificarCuit(cuit) {
    cuit = cuit.replace(/[^\d]/g, '');
    if (cuit.length !== 11) {
        return false;
    }
    let acumulado = 0;
    let digitos = cuit.split('').map(Number);
    let digito = digitos.pop();
    for (let i = 0; i < digitos.length; i++) {
        acumulado += digitos[9 - i] * (2 + (i % 6));
    }
    let verif = 11 - (acumulado % 11);
    if (verif === 11) {
        verif = 0;
    } else if (verif === 10) {
        verif = 9;
    }
    return digito === verif;
}

function validarCorreoElectronico(correo) {
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(correo);
}

function validarTelefono(telefono) {
    // La expresión regular permite números, paréntesis y guiones medios
    const expresionRegularTelefono = /^[\d()+-]+$/;
    if (telefono.toString().length < 8) {
        return false;
    }
    return expresionRegularTelefono.test(telefono);
}

function validarMatriculaVehicular(matricula) {
    const patenteVieja = /^[A-Z]{3}\s?\d{3}$/;
    const patenteNueva = /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/;
    return patenteVieja.test(matricula) || patenteNueva.test(matricula);
}

function cargarTablas() {
    let tablaC = document.getElementById('tabla-clientes');
    let tablaV = document.getElementById('tabla-vehiculos');
    tablaC.innerHTML = '';
    tablaV.innerHTML = '';
    for (let cliente of listaClientes) {
        tablaC.insertAdjacentHTML('beforeend', rowCliente(cliente));
        for (let vehiculo of cliente.vehiculos) {
            tablaV.insertAdjacentHTML('beforeend', rowVehiculo(cliente.cuit, vehiculo));
        }
    }
}

function rowCliente(cliente) {
    return `<tr><td>${cliente.cuit}</td>` +
        `<td>${cliente.nombreCompleto}</td>` +
        `<td>${cliente.telefono}</td>` +
        `<td>${cliente.email}</td></tr>`;
}

function rowVehiculo(cuit, vehiculo) {
    return `<tr><td>${cuit}</td>` +
        `<td>${vehiculo.tipo}</td>` +
        `<td>${vehiculo.anio}</td>` +
        `<td>${vehiculo.marca}</td>` +
        `<td>${vehiculo.modelo}</td>` +
        `<td>${vehiculo.patente}</td>` +
        `<td>${(vehiculo.gnc) ? 'X' : '-'}</td>` +
        `<td>${vehiculo.descripcion}</td></tr>`;
}