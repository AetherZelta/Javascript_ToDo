export default class Modal {
  constructor() {
    //se obtiene en titulo, descripcion 
    this.title = document.getElementById('modal-title');
    this.description = document.getElementById('modal-description');
    this.btn = document.getElementById('modal-btn');
    this.completed = document.getElementById('modal-completed');
  }

  //se agrega un evento al hacer clic sobre el boton 
  //para mostrar el modal con el formulario
  onClick(callback) {
    this.btn.onclick = () => {
      if (!this.title.value || !this.description.value) {
        this.alert.show('Title and description are required');
        return;
      }
    }
  }
}
