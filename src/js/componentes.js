import { TodoTareas } from "../classes/index";
import { todoList } from '../index';


// Referencias del HTML
const todoListHtml = document.querySelector('.todo-list'),
      textInput    = document.querySelector('.new-todo'),
      elimComplet  = document.querySelector('.clear-completed'),
      ulFiltrar    = document.querySelector('.filters'),
      filtroActivo = document.querySelectorAll('.filtro');



export const crearTodo = (todo) => {

    const htmlTodo = `
    <li class="" data-id="${ todo.id }">
        <div class="view">
            <input type="checkbox" class="toggle" ${ todo.completado ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div. innerHTML = htmlTodo;
    todoListHtml.append(div.firstElementChild);

    return div.firstElementChild;
}


// Eventos 
textInput.addEventListener('keyup', (e) => {

    if(e.keyCode === 13 && textInput.value != '') {

        const todo = new TodoTareas(textInput.value);
        crearTodo(todo);

        todoList.nuevoTodo(todo);
        textInput.value = '';
    }
});



todoListHtml.addEventListener('click', (e) => {

    const nomElemento  = e.target.localName; //Va a ser el btn de cerrar, el input de escribir o el label del texto
    const elemContTodo = e.target.parentElement.parentElement;
    const idTodo       = elemContTodo.getAttribute('data-id');

    // Marcar como completada la tarea
    if(nomElemento.includes('input')){
        todoList.marcarCompletado(idTodo);
        elemContTodo.classList.toggle('completed');
    }
    // Eliminar todo de la lista
    if(nomElemento.includes('button')){
        todoList.eliminarTodo(idTodo);
        todoListHtml.removeChild(elemContTodo);
    }
});



elimComplet.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for(let i = todoListHtml.children.length-1; i >=0; i--){        
        const elemento = todoListHtml.children[i];

        if(elemento.classList.contains('completed')){
            todoListHtml.removeChild(elemento);
        }
    }
})


ulFiltrar.addEventListener('click', (e) => {

    const filtro = e.target.text;

    if(!filtro) return;

    filtroActivo.forEach(elem => elem.classList.remove('selected'));
    e.target.classList.add('selected')

    for(const elemen of todoListHtml.children){
        elemen.classList.remove('hidden');
        const completado = elemen.classList.contains('completed');

        switch(filtro) {
            case 'Pendientes' :
                if(completado){
                    elemen.classList.add('hidden');
                }
            break;

            case 'Completada' :
                if(!completado){
                    elemen.classList.add('hidden');
                }
            break;
        }
    }
});