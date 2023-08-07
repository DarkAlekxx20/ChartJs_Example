let indexMaestroSeleccionado;
let maestros = [];

 /*function inicializar() {
  /* configureTableFilter(document.getElementById("txtBusquedaEmpleado"),
      document.getElementById("tmaes"));
  refrescarTabla();
}*/

document.addEventListener("DOMContentLoaded", refrescarTabla);
document.addEventListener("DOMContentLoaded", actualizarGrafico);

 function obtenerValorRadioArea() {
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

function obtenerValorRadioRol() {
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
 /* const areas = {};
  for (const maestroC of maestros) {
    if(areas[maestroC.area]){
      areas[maestroC.area]++;
    }else{
      areas[maestroC.area] = 1;
    }*/

    
    fetch('api/maestro/getAll')
    .then(response => response.json()) // Asegúrate de que la respuesta esté en formato JSON
    .then(data => {

      
      // Paso 2: Procesa los datos obtenidos
      const maestrosPorArea = {}; // Objeto para mantener el recuento de maestros por área

      data.forEach(item => {
        if (maestrosPorArea[item.area]) {
          maestrosPorArea[item.area]++;
        } else {
          maestrosPorArea[item.area] = 1;
        }
      });
      const datasets = [];

      // Iterar sobre los datos y crear los conjuntos de datos con colores aleatorios
      data.forEach(item => {
        const dataset = {
          label: 'Datos',
          data: item.data, // Usar los datos correspondientes desde la base de datos
          backgroundColor: `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 0.2)`, // Color de fondo aleatorio
          borderColor: `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 1)`, // Color del borde aleatorio
          borderWidth: 1,
        };
        datasets.push(dataset);
      });

      // Función para obtener un valor aleatorio entre 0 y 255
      function getRandomColor() {
        return Math.floor(Math.random() * 256);
      }


      const labels = Object.keys(maestrosPorArea); // Áreas serán las etiquetas del gráfico
      const values = Object.values(maestrosPorArea); // Número de maestros por área

      // Paso 3: Crea y configura el gráfico con Chart.js
      const ctx = document.getElementById('maestrosPorArea').getContext('2d');
      const miGrafico = new Chart(ctx, {
        type: 'pie', // Puedes cambiar el tipo de gráfico según tus necesidades
        data: {
          labels: labels,
          datasets: [{
            label: 'Número de Maestros por Área',
            data: values,
            
            borderWidth: 1 // Grosor del borde de las barras
          }]
        },
        options: {
          responsive: true,


          
          


          scales: {
            y: {
              beginAtZero: true, // Iniciar eje y en cero
              title: {
                display: true,
                text: 'Maestros' // Etiqueta personalizada para el eje y
              },
              ticks: {
                callback: function (value, index, values) {
                  if (Number.isInteger(value)) {
                    return value; // Mostrar solo números enteros
                  }
                }
              }
            }
          },

        }
      });
    })
    .catch(error => console.error('Error al obtener los datos:', error));



  }

 function save() {
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
  maestro.usuario = new Object();

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
      maestro.usuario.idUsuario = 0;
    } else {
      maestro.idMaestro = idMaestro;
      maestro.usuario.idUsuario = idUsuario;
    }

    maestro.nombre = nombre;
    maestro.apePaterno = ape1;
    maestro.apeMaterno = ape2;
    maestro.matricula = matricula;
    maestro.area = area;
    maestro.usuario.nombreUsuario = nombreUsuario;
    maestro.usuario.contrasenia = contrasenia;
    maestro.usuario.rol = "maestro";
    maestro.usuario.correo = correo;

    datos = { datosMaestro: JSON.stringify(maestro) };
    params = new URLSearchParams(datos);
    fetch(
      "api/maestro/save", //Se pone la ruta del servicio
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
    actualizarGrafico();
    console.log(JSON.stringify(maestro));
  } else {
    alert("Campos vacios");
  }
  actualizarGrafico();
}

function refrescarTabla() {
  let url = "api/maestro/getAll";
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

 function clean() {
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

 function selectMaestro(index) {
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

 function loadTabla(data) {
  maestros = data;
  let cuerpo = "";
  let resultadoEstatus = maestros.filter(
    (element) => element.estatus === "Activo"
  );
  maestros.forEach(function (maestro) {
    let registro =
      '<tr onclick="selectMaestro(' +
      maestros.indexOf(maestro) +
      ');">' +
      "<td>" +
      maestro.nombre +
      "</td>" +
      "<td>" +
      maestro.apePaterno +
      "</td> " +
      "<td>" +
      maestro.apeMaterno +
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



/*function generatePDF() {
  const canvas = document.getElementById('maestrosPorArea');
  const dataURL = canvas.toDataURL('image/jpeg', 1.0);
  const pdf = jspdf()
  pdf.addImage(dataURL, 'JPEG', 10, 10, 180, 90);
  pdf.save('chart.pdf');
}*/



    // Función para generar el PDF con jsPDF
    function generarPDF() {
      // Obtener el contenido HTML del gráfico
      const chartCanvas = document.getElementById('maestrosPorArea');
      const chartImage = chartCanvas.toDataURL('image/png');

      
      const { jsPDF } = window.jspdf;
      // Crear un nuevo documento PDF
      const pdf = new jsPDF();

      // Agregar el gráfico al PDF
      pdf.addImage(chartImage, 'PNG', 10, 10, 100, 100); // Ajusta las coordenadas y el tamaño del gráfico en el PDF

      // Guardar el PDF y descargarlo
      pdf.save('grafico.pdf');
    }