
export class TodoTareas {

    static todoJSON({tarea, id, completado, creada}){
        const tempTodo = new TodoTareas(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creada = creada;

        return tempTodo;
    }

    
    constructor(tarea){
        this.tarea     = tarea;

        this.id        = new Date().getTime();   //Va a lanzar un numero random
        this.completado = false;
        this.creada    = new Date();
    }
}