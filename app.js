async function cargarRecetas() {

    const XML = await fetch("recetas.xml");
    const XMLTexto = await XML.text();

    const parser = new DOMParser();
    const documento = parser.parseFromString(XMLTexto, "application/xml");

    const listaRecetasXML = documento.querySelectorAll("receta");

    const listaRecetasJSON = [];

    listaRecetasXML.forEach(nodo => {

        let receta = {
            codigo: nodo.getAttribute("codigo"),
            nombre: nodo.querySelector("nombre").textContent,
            categoria: nodo.querySelector("categoria").textContent,
            tiempo: Number(nodo.querySelector("tiempo").textContent),
            dificultad: nodo.querySelector("dificultad").textContent
        };

        listaRecetasJSON.push(receta);
    });

    mostrarTabla(listaRecetasJSON);
}

function mostrarTabla(recetas) {

    const tbody = document.getElementById("tablaRecetas");

    recetas.forEach(receta => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${receta.codigo}</td>
            <td>${receta.nombre}</td>
            <td>${receta.categoria}</td>
            <td>${receta.tiempo}</td>
            <td>${receta.dificultad}</td>
        `;

        tbody.appendChild(fila);
    });
}

cargarRecetas();