let indexMaestroSeleccionado;
let maestros = [];

export function inicializar() {
  /* configureTableFilter(document.getElementById("txtBusquedaEmpleado"),
      document.getElementById("tmaes"));*/
  refrescarTabla();
}

export function obtenerValorRadioArea() {
  // Obtener el fieldset por su ID
  var areaM = document.getElementById("areaM");
  // Obtener todos los elementos input tipo radio dentro del fieldset
  var radios = areaM.querySelectorAll('input[type="radio"]');
  // Iterar sobre los radios para encontrar el valor seleccionado
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      // El valor seleccionado se encuentra en la propiedad 'value' del radio seleccionado
      var valorSeleccionado = radios[i].value;
      console.log("El valor seleccionado es: " + valorSeleccionado);
      break; // Rompemos el bucle ya que encontramos el valor seleccionado
    }
  }
  return valorSeleccionado;
}

export function obtenerValorRadioRol() {
  // Obtener el fieldset por su ID
  var areaM = document.getElementById("rol");

  // Obtener todos los elementos input tipo radio dentro del fieldset
  var radios = areaM.querySelectorAll('input[type="radio"]');

  // Iterar sobre los radios para encontrar el valor seleccionado
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      // El valor seleccionado se encuentra en la propiedad 'value' del radio seleccionado
      var valorSeleccionado = radios[i].value;
      console.log("El valor seleccionado es: " + valorSeleccionado);

      break; // Rompemos el bucle ya que encontramos el valor seleccionado
    }
  }
  return valorSeleccionado;
}

function actualizarGrafico() {
  const areas = {};
  for (const maestroC of maestros) {
    if(areas[maestroC.area]){
      areas[maestroC.area]++;
    }else{
      areas[maestroC.area] = 1;
    }
  }

  const ctx = document.getElementById('maestrosPorArea').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(areas),
      datasets: [{
        label: 'Maestros por Área',
        data: Object.values(areas),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

export function save() {
  var idMaestro = document.getElementById("idMaestro").value;
  var idUsuario = document.getElementById("idUsuario").value;
  var nombre = document.getElementById("nombres").value;
  var ape1 = document.getElementById("ape1").value;
  var ape2 = document.getElementById("ape2").value;
  var matricula = document.getElementById("matriculaM").value;
  var area = obtenerValorRadioArea();
  var nombreUsuario = document.getElementById("nombreUsuario").value;
  var contrasenia = document.getElementById("contrasenia").value;
  var correo = document.getElementById("correo").value;
  const maestroC = {
    nombre,
    ape1,
    matricula,
    area,
    nombreUsuario,
    contrasenia,
    correo
  };
  maestros.push(maestroC);
  let datos = null;
  let params = null;

  let maestro = new Object();
  maestro.user = new Object();

  if (
    nombre !== "" &&
    ape1 !== "" &&
    ape2 !== "" &&
    matricula !== "" &&
    area !== null
  ) {
    alert(
      "Se guardaran los siguientes datos:" +
        "\n Nombre: " +
        nombre +
        "\n Apellidos: " +
        ape1 +
        " " +
        ape2 +
        "\n Matricula: " +
        matricula +
        "\n Area: " +
        area +
        "\n Nombre de Usuario: " +
        nombreUsuario +
        "\n Contraseña: " +
        contrasenia +
        "\n Correo: " +
        correo
    );

    if (idMaestro === 0 || idMaestro === "") {
      maestro.idMaestro = 0;
      maestro.user.idUsuario = 0;
    } else {
      maestro.idMaestro = idMaestro;
      maestro.user.idUsuario = idUsuario;
    }

    maestro.nombre = nombre;
    maestro.ape1 = ape1;
    maestro.ape2 = ape2;
    maestro.matricula = matricula;
    maestro.area = area;
    maestro.user.nombreUsuario = nombreUsuario;
    maestro.user.contrasenia = contrasenia;
    maestro.user.rol = "maestro";
    maestro.user.correo = correo;

    datos = { datosMaestro: JSON.stringify(maestro) };
    params = new URLSearchParams(datos);
    fetch(
      "../api/maestro/save", //Se pone la ruta del servicio
      {
        method: "POST", //el tipo de metodo que tenemos que definir que es POST si no se pone nada por default se Pone en GET
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        }, // Es para que vea como le estoy enviando los datos el servicio (Cabezara del servico)
        body: params,
      }
    )
      .then((response) => {
        return response.json();
      }) //Es respuesta Cruda
      .then(function (data) {
        if (data.exception != null) {
          swal.fire(
            "",
            "Error interno del servidor. Intente nuevamente mas tarde.",
            "error"
          );
          return;
        }
        if (data.error != null) {
          swal.fire("", data.error, "warning");
          return;
        }
        if (data.errorperm != null) {
          swal.fire(
            "",
            "No tiene permiso para realizae esta operacion.",
            "warning"
          );
          return;
        } //Estamos aguarda las ID'S en las cajas de texto
        refrescarTabla();
        actualizarGrafico();
      });
    alert("todo bien.");
    console.log(JSON.stringify(maestro));
  } else {
    alert("Campos vacios");
  }
}

export function refrescarTabla() {
  let url = "../api/maestro/getAll";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      if (data.exception != null) {
        Swal.fire(
          "",
          "Error interno del servidor. Intente nuevamente mas tarde.",
          "error"
        );
        return;
      }

      if (data.error != null) {
        Swal.fire("", data.error, "warning");
        return;
      }
      if (data.errorsec != null) {
        Swal.fire("", data.errorsec, "error");
        window.location.replace("Dashboard.html");
        return;
      }
      loadTabla(data);
    });
}

export function clean() {
  document.getElementById("nombres").value = "";
  document.getElementById("ape1").value = "";
  document.getElementById("ape2").value = "";
  document.getElementById("matriculaM").value = "";
  var areaM = document.getElementById("areaM");
  // Obtener todos los elementos input tipo radio dentro del fieldset
  var radios = areaM.querySelectorAll('input[type="radio"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
}

export function selectMaestro(index) {
  document.getElementById("nombres").value = maestros[index].nombre;
  document.getElementById("ape1").value = maestros[index].ape1;
  document.getElementById("ape2").value = maestros[index].ape2;
  document.getElementById("matriculaM").value = maestros[index].matricula;
  const opcion1 = document.getElementById("rbtn1");
  const opcion2 = document.getElementById("rbtn2");
  const opcion3 = document.getElementById("rbtn3");
  if (maestros[index].area === "DSM") {
    opcion1.checked = true;
    opcion2.checked = false;
    opcion3.checked = false;
  }
  if (maestros[index].area === "GS") {
    opcion2.checked = true;
    opcion1.checked = false;
    opcion3.checked = false;
  }
  if (maestros[index].area === "EVN") {
    opcion3.checked = true;
    opcion1.checked = false;
    opcion2.checked = false;
  }
  indexMaestroSeleccionado = index;
}

export function loadTabla(data) {
  maestros = data;
  let cuerpo = "";
  let resultadoEstatus = maestros.filter(
    (element) => element.estatus === "Activo"
  );
  maestros.forEach(function (maestro) {
    let registro =
      '<tr onclick="moduloMaestros.selectMaestro(' +
      maestros.indexOf(maestro) +
      ');">' +
      "<td>" +
      maestro.nombre +
      "</td>" +
      "<td>" +
      maestro.ape1 +
      "</td> " +
      "<td>" +
      maestro.ape2 +
      "</td>" +
      "<td>" +
      maestro.matricula +
      "</td>" +
      "<td>" +
      maestro.area +
      "</td></tr>";
    cuerpo += registro;
  });
  document.getElementById("tblMaestros").innerHTML = cuerpo;
}
