import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import TaskForm from './TaskForm'
import Modal from 'react-modal';

const Tasks = () => {

    const [ tasks, setTasks ] = useState([])
    const [ task, setTask ] = useState({})
    const [currentTask, setCurrentTask] = useState({})

    

    const getTasks = () => {
        axios.get('/api/v1/tasks.json')
            .then( resp => {
                setTasks(resp.data.data)
            })
            .catch( resp => console.log(resp) )
    }

    useEffect(() => {
        getTasks()
    }, [tasks.length])

    const handleChange = (e) => {
        if (e instanceof Date) {
            setTask(Object.assign({}, task, {['scheduled_at']: e}))
        } else {
            setTask(Object.assign({}, task, {[e.target.name]: e.target.value}))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/tasks', {task})
            .then(resp => {
                getTasks();
                task = {}
            })
            .catch(resp => {

            })
    }

    const deleteTask = (id) => {
        axios.delete('/api/v1/tasks/' + id)
            .then(resp => {
                const newTasks = tasks.filter((item) => item.id !== id);
                setTasks(newTasks);
            })
            .catch(resp => {

            })
    }

    const editTask = (id) => {
        let ct = tasks.find((t) => t.id == id);
        console.log(ct)
        setCurrentTask(ct)
        openModal()
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.put('/api/v1/tasks/' + task.id, {task})
            .then(resp => {
                getTasks()
            })
            .catch(resp => {

            })
    }

    const grid = tasks.map( item => {
        return (
            <div className="card p-3" key={item.id}>
                <div className="container">
                    <div className="row">
                        <div className="task-name col-sm-9">{ item.attributes.name }</div>
                        <div className="task-date col-sm-3">{ new Date(item.attributes.scheduled_at).toLocaleDateString() }</div>
                    </div>
                </div>
                <div className="container mt-2">
                    <div className="row">
                        <div className="task-delete col-sm-4"><button onClick={() => deleteTask(item.id)} class="btn btn-danger">Delete task</button></div>
                        <div className="task-edit col-sm-4"><button onClick={() => editTask(item.id)} class="btn btn-primary">Edit task</button></div>
                    </div>
                </div>
            </div>
        )
    })

    let subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        
    }
    
    function closeModal(){
        setIsOpen(false);
    }



    return (
        <div className="container"> 
            
            <div className="row">
                <div className="col-lg-12">
                    <div className="header text-center">
                        <h1>TaskApp</h1>
                    </div>
                    <div id="mymodal"></div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 mt-3">
                    <TaskForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        intent='create'
                        currentTask={currentTask}
                        getTasks={getTasks}
                    />
                </div>

                <div className="col-lg-6 mt-3">
            
                    {grid}
                
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        currentTask={currentTask}
                        appElement={document.getElementById('#mymodal')}
                    >
                        
                        <TaskForm
                            handleChange={handleChange}
                            handleSubmit={handleUpdate}
                            intent='update'
                            currentTask={currentTask}
                            getTasks={getTasks}
                        />

                        <button onClick={closeModal} className="btn btn-warning mt-3">Close Modal</button>
                    </Modal>
                </div>
            </div>
            
        </div>
    )
}

export default Tasks