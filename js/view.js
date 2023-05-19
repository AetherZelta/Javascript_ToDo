import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';
import Alert from './components/alert.js';


export default class View {
  constructor() {
    this.model = null;
    //obtener la tabla
    this.table = document.getElementById('table');
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    this.filters = new Filters();
    this.alert = new Alert('alert');
    

    this.addTodoForm.onClick((title, description, fecha) => this.addTodo(title, description, fecha));
    this.modal.onClick((id, values) => this.editTodo(id, values));
    this.filters.onClick((filters) => this.filter(filters));
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  filter(filters) {
    const { type, words } = filters;
    const [, ...rows] = this.table.getElementsByTagName('tr');
    //en este punto 
    for (const row of rows) {
      const [title, description, completed] = row.children;
      let shouldHide = false;

      if (words) {
        shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
      }
      else{
        this.alert.show('Title and description are required');
      }

      const shouldBeCompleted = type === 'completed';
      const isCompleted = completed.children[0].checked;

      if (type !== 'all' && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      if (shouldHide) {
        row.classList.add('d-none');
      } else {
        row.classList.remove('d-none');
      }
    }
  }

  addTodo(title, description, fecha) {
    const todo = this.model.addTodo(title, description, fecha); 
    this.createRow(todo);
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  editTodo(id, values) {
    this.model.editTodo(id, values);
    const row = document.getElementById(id);
    row.children[0].innerText = values.title;
    row.children[1].innerText = values.description;
    row.children[2].innerText = values.fecha;
    row.children[3].children[0].checked = values.completed;
  }
  
  //recibe un parametro del renglon que tiene que borrar en la tabla
  //es decir que recibe el id del renglon a borrar
  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }
   
  //se crea un Todo, es decir un renglon en la tabla y se le asigna un id
  createRow(todo) {
    const row = table.insertRow();
    row.setAttribute('id', todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td>${todo.fecha}</td>
      <td class="text-center">

      </td>
      <td class="text-right">

      </td>
    `;
    //se crea un elemento de HTML, en este caso es un checkbox dentro de 
    // un renglon de la tabla para marcar el ToDo como finalizado  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id);
    //el chebox se crea como 3er elemento del renglon
    row.children[3].appendChild(checkbox);

    //se crea un boton dentro del renglon, se crea el boton de editar 
    const editBtn = document.createElement('button');
    //se agregar las clases de bootstrap 
    editBtn.classList.add('btn', 'btn-primary', 'mb-1');
    //se agrega o concatena otro elemento de html para usar las clases
    //de font Awesome
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    //se agregan atributos para que haga referencia que al hacer clic sobre el
    //elemento haga referencia al modal de editat
    editBtn.setAttribute('data-toggle', 'modal');
    editBtn.setAttribute('data-target', '#modal');
    editBtn.onclick = () => this.modal.setValues({
      id: todo.id,
      title: row.children[0].innerText,
      description: row.children[1].innerText,
      fecha: row.children[2].innerText,
      completed: row.children[3].children[0].checked,
    });
    
    row.children[4].appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[4].appendChild(removeBtn);
  }
}
