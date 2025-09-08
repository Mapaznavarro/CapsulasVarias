// Cambio de valores de fecha:
var fechaDesde = '31/07/2024';
var fechaHasta = '31/07/2024';


// Obtiene el índice de la próxima fila a procesar
// let idx = Number(localStorage.getItem(KEY) || '0');

function BtnBuscar()
{
  // Buscar
  document.getElementById(Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('ui-button')).id).click();
  console.log('Boton Buscar')
}

function llenadoFiltros( f1, f2, estadoLetras, estadoNumero)
{
  // Asignando Fecha Desde
  // Encuentra el label con el texto deseado
  var label = Array.from(document.querySelectorAll('.md-inputfield > label'))
    .find(l => l.textContent.trim() === "Fecha Desde");
  
  // Si el label existe, busca el input correspondiente (hermano)
  if (label) {
    // El input está dentro del primer span hermano (anterior)
    var input = label.previousElementSibling.querySelector('input');
    var id = input.id;
    console.log(id); // <-- Aquí obtienes el id
  }
  var campo = document.getElementById(id);
  campo.removeAttribute('readonly');
  campo.value = fechaDesde;
  campo.dispatchEvent(new Event('change'));
  
  // Asignando Fecha Hasta
  // Encuentra el label con el texto deseado
  var label = Array.from(document.querySelectorAll('.md-inputfield > label'))
    .find(l => l.textContent.trim() === "Fecha Hasta");
  
  // Si el label existe, busca el input correspondiente (hermano)
  if (label) {
    // El input está dentro del primer span hermano (anterior)
    var input = label.previousElementSibling.querySelector('input');
    var id = input.id;
    console.log(id); // <-- Aquí obtienes el id
  }
  var campo = document.getElementById(id);
  campo.removeAttribute('readonly');
  campo.value = fechaHasta;
  campo.dispatchEvent(new Event('change'));

  // Asignar valor al campo Estado en PrimeFaces SelectOneMenu
  
  // 1. Encuentra el label "Estado"
  var labelEstado = Array.from(document.querySelectorAll('.md-inputfield > label'))
    .find(l => l.textContent.trim() === "Estado");
  
  // 2. Si existe, busca el SelectOneMenu correspondiente (el div hermano anterior)
  if (labelEstado) {
    // El div con el SelectOneMenu está justo antes del label
    var divSelectMenu = labelEstado.previousElementSibling;
    // Encuentra el <select> dentro del div
    var select = divSelectMenu.querySelector('select');
    var id = select.id;
    console.log('ID del select:', id);
  
    // 3. Cambia el valor del select (por ejemplo, "2" para "CARGADO")
    // "-100" para "Todos"
    var valor = estadoNumero; // <-- Cambia aquí el valor según la opción que desees
    select.value = valor;
  
    // 4. Simula el evento de cambio para que PrimeFaces lo reconozca
    select.dispatchEvent(new Event('change', { bubbles: true }));
  
    // 5. Opcional: Simula el click en el menú para actualizar visualmente
    // (esto es útil si quieres que el label y el UI se sincronicen)
    var trigger = divSelectMenu.querySelector('.ui-selectonemenu-trigger');
    if (trigger) trigger.click();
  
    setTimeout(() => {
      // Busca el <li> correspondiente y haz click
      var opciones = Array.from(document.querySelectorAll(`#${id.replace(/:/g, '\\:')}_items li`));
      var liSeleccionado = opciones.find(li => li.getAttribute('data-label') === estadoLetras);
      if (liSeleccionado) liSeleccionado.click();
    }, 300);
  
  } else {
    alert('No se encontró el campo "Estado".');
  }

  
}

// SNIPPET PARA MOSTRAR "TIPO ARCHIVO" Y "FECHA" DE LA TABLA EN "GESTIÓN ARCHIVOS"

// 1. Activa la tab "Gestión Archivos" si es necesario
function activarTabGestionArchivos() {
  const tabContainer = document.getElementById('myForm');
  if (!tabContainer) {
    alert('No se encontró el contenedor de tabs (id: myForm)');
    return false;
  }
  // Busca el tab con texto "Gestión Archivos"
  const tabs = tabContainer.querySelectorAll('.ui-tabs-nav li');
  let tabFound = false;
  tabs.forEach(tab => {
    if (tab.textContent.includes('Gestión Archivos')) {
      tab.click();
      tabFound = true;
    }
  });
  return tabFound;
}

// 2. Extrae los datos de la tabla "Gestión Archivos"
function mostrarDatosGestionArchivos() {
  const tabla = document.getElementById('myForm:archivosDataTable');
  if (!tabla) {
    alert('No se encontró la tabla de Gestión Archivos (id: myForm:archivosDataTable)');
    return;
  }
  const tbody = tabla.querySelector('tbody');
  if (!tbody) {
    alert('No se encontró el <tbody> de la tabla de Gestión Archivos');
    return;
  }
  const filas = Array.from(tbody.querySelectorAll('tr'));
  if (filas.length === 0) {
    alert('No hay filas en la tabla de Gestión Archivos');
    return;
  }
  // Busca índices de columnas por el texto del encabezado
  const thead = tabla.querySelector('thead');
  let idxTipoArchivo = -1, idxFecha = -1;
  if (thead) {
    const headers = Array.from(thead.querySelectorAll('th'));
    headers.forEach((th, i) => {
      const text = th.textContent.trim();
      if (text.includes('Tipo Archivo')) idxTipoArchivo = i;
      if (text.includes('Fecha')) idxFecha = i;
    });
  }
  // Si no pudo detectar los índices, avisa
  if (idxTipoArchivo === -1 || idxFecha === -1) {
    alert('No se pudo encontrar las columnas "Tipo Archivo" y/o "Fecha" en el encabezado');
    return;
  }
  // Muestra los datos en consola
  console.log('--- Tipo Archivo | Fecha ---');
  filas.forEach((fila, filaIdx) => {
    const celdas = fila.querySelectorAll('td');
    let tipoArchivo = celdas[idxTipoArchivo]?.textContent.trim() || '';
    let fecha = celdas[idxFecha]?.textContent.trim() || '';
    console.log(`Fila ${filaIdx + 1}: ${tipoArchivo} | ${fecha}`);
  });
}


// PARTE 1: Definición de la función
function copiarDatosGestionArchivos() {
  const tbody = document.getElementById('myForm:archivosDataTable_data');
  if (!tbody) {
    alert('No se encontró la tabla de archivos');
    return;
  }

  const filas = Array.from(tbody.querySelectorAll('tr'));
  if (filas.length === 0) {
    alert('No hay filas en la tabla de archivos');
    return;
  }

  // Encabezados con separador PIPE
  let texto = "Fila|Periodicidad|Fecha|Tipo Archivo|Última Actividad|Estado|Fecha Entrega|Envío a CMF\n";

  filas.forEach((fila, idx) => {
    let periodicidad = '', fecha = '', tipoArchivo = '', ultimaActividad = '', estado = '', fechaEntrega = '', envioCMF = '';
    const celdas = fila.querySelectorAll('td');
    celdas.forEach(td => {
      const labelSpan = td.querySelector('.ui-column-title');
      if (labelSpan) {
        const label = labelSpan.textContent.trim();
        const value = Array.from(td.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.textContent.trim())
          .join('');
        if (label === 'Periodicidad') periodicidad = value;
        if (label === 'Fecha') fecha = value;
        if (label === 'Tipo Archivo') tipoArchivo = value;
        if (label === 'Última Actividad') ultimaActividad = value;
        if (label === 'Estado') estado = value;
        if (label === 'Fecha Entrega') fechaEntrega = value;
        if (label === 'Envio a CMF') {
          // Verifica el icono: verdeCheck = 1, gris = 0
          const icon = td.querySelector('.fa-check-circle');
          if (icon) {
            if (icon.classList.contains('verdeCheck')) envioCMF = '1';
            else envioCMF = '0';
          } else {
            envioCMF = '0';
          }
        }
      }
    });
    texto += `${idx + 1}|${periodicidad}|${fecha}|${tipoArchivo}|${ultimaActividad}|${estado}|${fechaEntrega}|${envioCMF}\n`;
  });

  // Copia al portapapeles manualmente usando textarea temporal
  const ta = document.createElement('textarea');
  ta.value = texto;
  document.body.appendChild(ta);
  ta.select();
  alert("¡Datos listos para copiar!\nPresiona Ctrl+C y luego pega en Excel, Bloc de notas, etc.");
  setTimeout(() => { document.body.removeChild(ta); }, 5000);
}

function abrirRutasDeTablaDetalle(tablaDetalleId = 'myForm:registrosDataTable_data') {
  const tabla = document.getElementById(tablaDetalleId);
  if (!tabla) {
    alert('No se encontró la tabla de detalle de registros');
    return;
  }
  const filas = Array.from(tabla.querySelectorAll('tr'));
  if (filas.length < 2) {
    alert('La tabla de detalle no tiene suficientes filas');
    return;
  }

  // Empezar en 1 para saltar encabezado
  for (let i = 1; i < filas.length; i++) {
    const celdas = filas[i].querySelectorAll('td');
    if (celdas.length === 0) continue;

    // Buscar <a> en la última celda
    const ultimaCelda = celdas[celdas.length - 1];
    const link = ultimaCelda.querySelector('a');
    if (link && link.href.startsWith("http")) {
      link.click(); // Simula el click como usuario
      alert(`Se abrió el link. Por favor, revisa la pestaña y ciérrala cuando termines. Haz click en OK para continuar con la siguiente fila.`);
    } else {
      console.log(`Fila ${i + 1}: No se detectó link válido en la última celda.`);
    }
  }
}

// MODIFICACIÓN: Llama a la función abrirRutasDeTablaDetalle después de esperarDetalleCompleto
async function recorrerArchivosFilaPorFila({ tiempoEspera = 20000, extraerDetalle = false, abrirRutas = true } = {}) {
  function obtenerFilasTablaPrincipal() {
    const tbody = document.getElementById('myForm:archivosDataTable_data');
    return tbody ? Array.from(tbody.querySelectorAll('tr')) : [];
  }

  async function esperarDetalleCompleto(timeout = 15000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const detalle = document.getElementById('myForm:gestionRegistrosTab');
      if (detalle) {
        const tabla = detalle.querySelector('#myForm\\:registrosDataTable_data');
        if (tabla && tabla.querySelector('tr')) {
          return detalle;
        }
      }
      await new Promise(res => setTimeout(res, 250));
    }
    return null;
  }

  function clickTabGestionArchivos() {
    const tabGestion = document.querySelector('a[href="#myForm:gestionArchivosTab"]');
    if (tabGestion) tabGestion.click();
    else alert("No se encontró la aleta de la ficha Gestión de Archivos");
  }

  const filas = obtenerFilasTablaPrincipal();
  const totalFilas = filas.length;

  for (let i = 0; i < totalFilas; i++) {
    const filasActuales = obtenerFilasTablaPrincipal();
    const fila = filasActuales[i];
    if (!fila) continue;

    const tdSeleccionable = Array.from(fila.querySelectorAll('td')).find(td => !td.classList.contains('actionColumn'));
    if (!tdSeleccionable) continue;

    tdSeleccionable.scrollIntoView({ behavior: "smooth", block: "center" });
    const htmlAntes = document.getElementById('myForm:gestionRegistrosTab')?.innerHTML || "";
    tdSeleccionable.click();

    await new Promise(res => setTimeout(res, 1000));
    const htmlDespues = document.getElementById('myForm:gestionRegistrosTab')?.innerHTML || "";
    const detalle = await esperarDetalleCompleto(15000);
    if (!detalle) {
      clickTabGestionArchivos();
      await new Promise(res => setTimeout(res, 2000));
      continue;
    }

    // MODIFICACIÓN: Abre rutas en nueva pestaña
    if (abrirRutas) abrirRutasDeTablaDetalle('myForm:registrosDataTable_data');

    // Extrae los datos del detalle si lo deseas
    if (extraerDetalle && typeof copiarTablaDetalleGestionArchivos === "function") {
      copiarTablaDetalleGestionArchivos();
    }

    clickTabGestionArchivos();
    await new Promise(res => setTimeout(res, 2000));
  }

  alert("¡Automatización terminada!");
}

// Ejecución del programa
// llenadoFiltros( f1, f2, estadoLetras, estadoNumero)
llenadoFiltros(fechaDesde,fechaHasta, "Todos", "-100"); // Ojo con los valores
BtnBuscar();
// copiarDatosGestionArchivos();

// Espera 20 segundos por fila
recorrerArchivosFilaPorFila({ tiempoEspera: 5000, extraerDetalle: false });
