import Alert from './alert.js';

export default class AddTodo {
  constructor() {
    //obtener el id del botón de agregar, la caja de texto de titulo y descripcioón
    this.btn = document.getElementById('add');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    //se crea un objeto de la clase alert
    this.alert = new Alert('alert');
  }

  onClick(callback) {
    //al dar clic en el botón add se ejecuta esto
    this.btn.onclick = () => {
      //comparar que las cajas de texto de titulo y descripción no esten vacías
      if (title.value === '' || description.value === '') {
        this.alert.show('Title and description are required');
      } else {
        this.alert.hide();
        callback(this.title.value, this.description.value);
        //limpiar los input
        this.title.value=''
        this.description.value='';
      }
    }
  }
}
