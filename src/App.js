import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinied] = useState(true);
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };  

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    console.log(e);
    const id = e.target.name;
    const index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const toggleShowFinished = (e) => {
      setShowFinied(!showFinished)
  }

  return (
    <div className="App">
      <Navbar />
      <div className=" mx-3 md:container bg-violet-100 md:mx-auto my-6 rounded-lg p-5 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">Itask - Manage Your Task at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold ">Add Todo</h2>
          <input
            onChange={handleChange}
            type="text"
            value={todo}
            className="w-full rounded-lg px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-500 disabled:bg-violet-600 hover:bg-violet-700 text-white px-2 py-1  rounded"
          >
            Add
          </button>
        </div>
        <input onChange={toggleShowFinished} type="checkbox" checked={showFinished} />      
        <h2 className="text-xl font-bold">YourTodo</h2>
        <div className="todos">
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) &&  (
              <div className="todo flex md:w-1/2 justify-between my-3">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    onChange={handleCheckbox}
                    checked={item.isCompleted}
                    name={item.id}
                    id=" "
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons ">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-500 hover:bg-violet-700 text-white px-2 py-1 mx-2 rounded"
                  >
                  <FaEdit />

                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-violet-500 hover:bg-violet-700 text-white px-2 py-1 mx-2 rounded"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;