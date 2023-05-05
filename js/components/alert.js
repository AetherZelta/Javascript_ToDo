export default class Alert {
  constructor(alertId) {
    //se obtenemos el elemento por el id, en este caso es 
    //la alerta definida en el index
    this.alert = document.getElementById(alertId);
  }

  show(message) {
    //borramos la cadena de texto de su clase de estilos para que se muestre
    this.alert.classList.remove('d-none');
    this.alert.innerText = message;
  }

  hide() {
    //este es un metodo para ocultar la alerta, agregando la clase d-no
    //para que se oculte.
    this.alert.classList.add('d-none');
  }
}
