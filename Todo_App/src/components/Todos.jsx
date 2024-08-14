import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function Todos() {

    const [todo, setTodo] = useState(""); // input text
    const [todos, setTodos] = useState([]);// array which is holds all input
    const [showFinished, setShowFinished ] = useState(true);

    useEffect(() => {
        let todoString = localStorage.getItem("todos")
        if (todoString) {
            let todos = JSON.parse(localStorage.getItem("todos"))
            setTodos(todos)
        }
    }, [])


    const saveToLS = (params) => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    const toggleFinished () 

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
        setTodo("");
        // console.log(todos);
        saveToLS();
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
        saveToLS();
    }

    const handleEdit = (e, id) => {
        let t = todos.filter(i => i.id === id);
        setTodo(t[0].todo);
        let newTodos = todos.filter(item => {
            return item.id !== id
        });
        setTodos(newTodos);
        saveToLS();
    }
    const handleDelete = (e, id) => {
        // alert("Are you Sure to Delete this Todo");     
        let newTodos = todos.filter(item => {
            return item.id !== id
        })
        setTodos(newTodos);
        saveToLS();
    }
    const handleChange = (e) => {
        setTodo(e.target.value)
    }
    return (
        <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
            <div className="addTodo my-5">
                <h2 className="text-lg font-bold">Add a Todo</h2>
                <input onChange={handleChange} value={todo} type="text" className='w=2/4' />
                <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6">Save</button>
            </div>
            <h2 className="text-lg font-bold"></h2>
            <div className="todos">
                {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
                {todos.map(item => {

                    return <div key={item.id} className="todo flex justify-between w-1/4 my-3">
                        <div className="flex gap-5">
                            <input name={item.id} onChange={handleCheckbox} type="checkbox" id='' value={item.isCompleted} />
                            <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                        </div>
                        <div className="buttons flex h-full">
                            <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">Edit</button>
                            <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">Delete</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Todos
