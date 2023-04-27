const $contenedorNotas = document.getElementById('contenedor-notas')

const $formulario = document.getElementById('form-notas')
const $titulo = document.getElementById('titulo')
const $descripcion = document.getElementById('descripcion')
const $prioridad = document.getElementById('prioridad')

const $tituloEdit = document.getElementById('tituloEdit')
const $descripcionEdit = document.getElementById('descripcionEdit')
const $prioridadEdit = document.getElementById('prioridadEdit')

const $btnModal = document.getElementById('modalBootstrap')
const $btnModalCancelar = document.getElementById('btnCancelarModal')
const $btnModalGuardar = document.getElementById('btnGuardarModal')

let notas = []

class Nota{
    constructor(titulo, descripcion, prioridad){
        this.titulo = titulo
        this.descripcion = descripcion
        this.prioridad = prioridad
        this.estado = false
        this.id = Date.now()
    }
    setTitulo(titulo){
        this.titulo = titulo
    }
    setDescripcion(descripcion){
        this.descripcion = descripcion
    }
    setPrioridad(prioridad){
        this.prioridad = prioridad
    }
    setEstado(){
        this.estado = !this.estado
    }
}

$formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    const titulo = $titulo.value
    const descripcion = $descripcion.value
    const prioridad = $prioridad.value
    if( [titulo, descripcion, prioridad].includes("") ){
        console.log('Complete los campos')
    }else{
        const nota = new Nota(titulo, descripcion, prioridad)
        $titulo.value = ""
        $descripcion.value = "" 
        $prioridad.value = "Baja"
        notas.push( nota )
        imprimirNotas(notas)
    }
    
})

$contenedorNotas.addEventListener('click', (event) => {
    if(event.target.type == "checkbox"){
        const nota = notas.find( nota => nota.id == parseInt(event.target.dataset.id) )
        nota.setEstado()
    }
    if(event.target.dataset.borrar){
        notas = notas.filter( nota => nota.id != parseInt(event.target.dataset.id) )
        imprimirNotas(notas)
    }
    if(event.target.dataset.editar){
        $btnModal.click()
        $btnModalGuardar.dataset.id = event.target.dataset.id
        const nota = notas.find( nota => nota.id == parseInt(event.target.dataset.id) )
        $tituloEdit.value = nota.titulo
        $descripcionEdit.value = nota.descripcion
        $prioridadEdit.value = nota.prioridad
        $btnModal.click()
        imprimirNotas(notas)
    }
})

$btnModalCancelar.addEventListener( 'click', () => {
    $tituloEdit.value = ""
    $descripcionEdit.value = ""
    $prioridadEdit.value = "Baja"
} )

$btnModalGuardar.addEventListener( 'click', (event) => {
    const nota = notas.find( nota => nota.id == parseInt(event.target.dataset.id) )
    nota.setTitulo( $tituloEdit.value )
    nota.setDescripcion( $descripcionEdit.value )
    nota.setPrioridad( $prioridadEdit.value )
    imprimirNotas(notas)
    $btnModalCancelar.click()
} )

function imprimirNotas( notas ) {
    $contenedorNotas.innerHTML = ""
    let template = notas.reduce( (acc, act) => acc + createNota(act), "" )
    $contenedorNotas.innerHTML = template
}

function createNota( nota ) {
    return `
        <article class="card border-primary col-12 article-nota">
            <div class="card-header d-flex flex-wrap justify-content-evenly align-items-center">
                <h2 class="card-title">${nota.titulo}</h2>
                <div class="form-check form-switch">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Estado</label>
                    <input class="form-check-input" type="checkbox" ${nota.estado ? 'checked' : ''} data-id="${nota.id} id="flexSwitchCheckDefault">
                </div>
            </div>
            <div class="card-body py-4 px-3 h-auto">
                <p class="card-text"><span class="fw-bold">Prioridad:</span> ${nota.prioridad}</p>
                <p class="card-text"><span class="fw-bold">Description:</span> ${nota.descripcion}</p>
            </div>
            <div class="card-footer d-flex justify-content-evenly">
                <button class="btn btn-danger" data-borrar="true" data-id="${nota.id}">Borrar</button>
                <button class="btn btn-info text-black" data-editar="true" data-id="${nota.id}">Editar</button>
            </div>
        </article>
    `
}