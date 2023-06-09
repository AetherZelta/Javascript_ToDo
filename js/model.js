//modulo para almacenar y controlar procesos
export default class Model {
  constructor() {
    this.view = null;
    //los todo's se van a almacenar en el navegador por medio del
    //localStorage
    this.todos = JSON.parse(localStorage.getItem('todos'));
  }

  setView(view) {
    this.view = view;
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos() {
    return this.todos.map((todo) => ({...todo}));
  }

  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  toggleCompleted(id) {
    const index = this.findTodo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.save();
  }

  editTodo(id, values) {
    const index = this.findTodo(id);
    Object.assign(this.todos[index], values);
    this.save();
  }

  addTodo(title, description, fecha) {
    //se le agrega un titulo al objeto, es decir al Todo
    const todo = {
      //el id se incrementa en uno      
      id: this.currentId++,
        title,
        description,
        completed: false,
        fecha
    }

    this.todos.push(todo);
    console.log(this.todos);
    this.save();
    //retona el valor del Todo agregado
    return {...todo};
  }

  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1);  
    this.save();
  }
}
