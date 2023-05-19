import Alert from './alert.js';

export default class Modal {
  constructor() {
    //se obtiene en titulo, descripcion del modal
    this.title = document.getElementById('modal-title');
    this.description = document.getElementById('modal-description');
    this.fecha = document.getElementById('modal-date');
    this.btn = document.getElementById('modal-btn');
    this.completed = document.getElementById('modal-completed');
    this.alert = new Alert('modal-alert');
    //se referencia la alerta
    this.alert = new Alert('modal-alert');

    this.todo = null;
  }
  //se editan los valores
  setValues(todo) {
    this.todo = todo;
    this.title.value = todo.title;
    this.description.value = todo.description;
    this.fecha.value = todo.fecha;
    this.completed.checked = todo.completed;
  }

  onClick(callback) {
    this.btn.onclick = () => {
      //se compara que los campos de titulo y descripcion no sean nulos, si es asi
      //se lanza una alerta
      if (!this.title.value || !this.description.value) {
        this.alert.show('Title and description are required');
        return;
      }

      $('#modal').modal('toggle');
//recupera los valores de titulo, descripcion y el checkbox del ToDo
//mediante el parametro que recibe de id
      callback(this.todo.id, {
        title: this.title.value,
        description: this.description.value,
        fecha: this.fecha.value,
        completed: this.completed.checked,
      });
    }
  }
}
