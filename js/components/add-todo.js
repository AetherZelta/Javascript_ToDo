
export default class AddTodo {
  constructor() {
    //obtener el id del botón de agregar, la caja de texto de titulo y descripcioón
    this.btn = document.getElementById('add');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
  }

  onClick(callback) {
    //al dar clic en el botón add se ejecuta esto
    this.btn.onclick = () => {
      //comparar que las cajas de texto de titulo y descripción no esten vacías
      if (title.value === '' || description.value === '') {
      } else { 
        this.alert.hide();
        callback(this.title.value, this.description.value);
        
      }
    }
  }
}
