var fecha = new Date();
var anio = fecha.getFullYear();
var mesInt = fecha.getMonth();
let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var mes = meses[mesInt];
document.getElementById("tittle").innerHTML = "Presupuesto " + mes.substring(0,3) + "/" + anio;
document.getElementById("txtPrincipal").innerHTML = "Presupuesto de <br>" + mes + " " + anio;

const selector = document.getElementById("tipoTransaccion");
const descriptor = document.getElementById("descripcionTransaccion");
const montor = document.getElementById("montoTransaccion");
const btnIngresos = document.getElementById("btnIngresos");
const btnEgresos = document.getElementById("btnEgresos");

var ingresos = 0;
var egresos = 0;
var balance = 0;
var porcentaje = 0;
var opcionLista = 0;
var ingLista = 0;
var egLista = 0;
var nuevoLista = 0;

let transacciones = [{
    tipo: "",
    descripcion: "",
    monto: 0
}];

function funcionAgregar() {
    const tipoTransaccion =  document.getElementById("tipoTransaccion").value;
    const descripcionTransaccion =  document.getElementById("descripcionTransaccion").value;
    const montoTransaccion =  parseFloat(document.getElementById("montoTransaccion").value);
    if (tipoTransaccion == ""){
        alert("Favor seleccionar el tipo de transaccion");
    } else if (descripcionTransaccion == ""){
        alert("Favor llenar la casilla descripción");
    } else if (montoTransaccion <= 0 && montoTransaccion !=""){
        alert("Favor insertar una cifra positiva en la casilla \"Monto\"")
    } else{
        var nuevo = {
            tipo: tipoTransaccion,
            descripcion: descripcionTransaccion,
            monto: montoTransaccion
        };
        transacciones.push(nuevo);
        if (tipoTransaccion == "Ingreso"){
            ingresos+=montoTransaccion;
            balance+=montoTransaccion;
            document.getElementById("ingresos").innerHTML ="+" + ingresos;
            document.ready = selector.value = "";
            document.ready = montor.value = "";
            document.ready = descriptor.value = "";
                llenarIngreso();
        } else if (tipoTransaccion == "Egreso"){
            egresos+=montoTransaccion;
            balance-=montoTransaccion;
            document.getElementById("egresos").innerHTML = "-" + egresos;
            document.ready = selector.value = "";
            document.ready = montor.value = "";
            document.ready = descriptor.value = "";
            llenarEgreso();
        } 
        porcentaje = Math.round((egresos * 100) / ingresos);
        if (balance >= 0)
            document.getElementById("txtBalance").innerHTML = "+" + balance;
        else
            document.getElementById("txtBalance").innerHTML = balance;
        
        document.getElementById("porcentajeGastos").textContent = porcentaje + "%";
        document.ready = selector.value = "";
        document.ready = montor.value = "";
        document.ready = descriptor.value = "";
    }
}

function funcionIngresos() {
    if (opcionLista == 1){
        opcionLista = 0;
        llenarIngreso();
        btnIngresos.style.borderColor="black";
        btnIngresos.style.backgroundColor="black";
        btnIngresos.style.color="whitesmoke";
        btnEgresos.style.borderColor="#c9c9c9";
        btnEgresos.style.backgroundColor="#c9c9c9";
        btnEgresos.style.color="white";
    }
}

function funcionEgresos() { 
    if (opcionLista == 0){
        opcionLista = 1;
        llenarEgreso();
        btnEgresos.style.borderColor="black";
        btnEgresos.style.backgroundColor="black";
        btnEgresos.style.color="whitesmoke";
        btnIngresos.style.borderColor="#c9c9c9";
        btnIngresos.style.backgroundColor="#c9c9c9";
        btnIngresos.style.color="white";
    }
}

function llenarIngreso() {
    if (opcionLista == 1){
        llenarEgreso();
    }
    else {
        limpiarLista();
        ingLista = 0;
        for (var rellenar = 1; rellenar < transacciones.length; rellenar++)
        {
            ingLista++;
            if (transacciones[rellenar].tipo == "Ingreso"){
                aumentoLista(0);
            }
        }
    }
}

function llenarEgreso() {
    if (opcionLista == 0){
        llenarIngreso();
    }
    else{
        limpiarLista();
        egLista = 0;
        for (var rellenar = 1; rellenar < transacciones.length; rellenar++)
        {
            egLista++;
            if (transacciones[rellenar].tipo == "Egreso"){
                aumentoLista(1);
            }
        }
    }
}

function limpiarLista() {
    document.getElementById('listaingeg').innerHTML = "";
}

function aumentoLista(ingEg) {
    if (opcionLista == ingEg){
        var tipoLista = "";
        if (ingEg == 0){
            nuevoLista = ingLista;
            tipoLista = "listaIngresos";
        }
        else if (ingEg == 1){
            nuevoLista = egLista;
            tipoLista = "listaEgresos";
        }        
        var nombreNuevo = String.fromCharCode(nuevoLista+64);

        var elementoLista = document.createElement('li');
        elementoLista.classList.add(nombreNuevo);
        elementoLista.setAttribute("id", nombreNuevo);
        document.querySelector("ul").appendChild(elementoLista);
        
        var newElement = document.createElement("div");
        newElement.classList.add(tipoLista);
        document.querySelector("." + nombreNuevo).appendChild(newElement);
    
        if (ingEg == 0){
      
            newElement = document.createElement("h3");
            newElement.classList.add("ingDescripcion");
            newElement.textContent = transacciones[nuevoLista].descripcion;
            document.querySelector("." + nombreNuevo + ">.listaIngresos").appendChild(newElement);
            
            newElement = document.createElement("h3");
            newElement.classList.add("ingMonto");
            newElement.textContent = "+" + transacciones[nuevoLista].monto;
            document.querySelector("." + nombreNuevo + ">.listaIngresos").appendChild(newElement);    
        }
        else if (ingEg == 1){
            newElement = document.createElement("h3");
            newElement.classList.add("egDescripcion");
            newElement.textContent = transacciones[nuevoLista].descripcion;
            document.querySelector("." + nombreNuevo + ">.listaEgresos").appendChild(newElement);
            
            newElement = document.createElement("h3");
            newElement.classList.add("egMonto");
            newElement.textContent = "-" + transacciones[nuevoLista].monto;
            document.querySelector("." + nombreNuevo + ">.listaEgresos").appendChild(newElement);    

            var percent = Math.round((transacciones[nuevoLista].monto * 100) / ingresos)

            newElement = document.createElement("h3");
            newElement.classList.add("egPercent");
            newElement.textContent = percent + "%";
            document.querySelector("." + nombreNuevo + ">.listaEgresos").appendChild(newElement);    
        }
    }
}