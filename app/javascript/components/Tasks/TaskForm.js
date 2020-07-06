import React, { useState, useEffect, Fragment } from 'react'
import Calendar from 'react-calendar';
import axios from 'axios'
import { useForm } from "react-hook-form";
import 'react-calendar/dist/Calendar.css';


let Taskform = (props) => {
    const { register, handleSubmit, watch, errors } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            name: props.currentTask.attributes ? props.currentTask.attributes.name : '',
            scheduled_at: props.currentTask.attributes ? new Date(props.currentTask.attributes.scheduled_at) : new Date()
        }
    });

    const [ task, setTask ] = useState({})
    const [ date, setDate ] = useState(new Date())

    const handleCalendarChange = (e) => {
        setDate(e)
    }

    const onSubmit = (data) => {
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        if (props.intent == 'create') {
            axios.post('/api/v1/tasks', {task: data})
                .then(resp => {
                    setTask({})
                    setDate(new Date())
                    props.getTasks()
                })
                .catch(resp => {
                    console.log(resp)
                })
        } else if (props.intent == 'update') {
            console.log(task.id)
            axios.put('/api/v1/tasks/' + task.id, {task: data})
                .then(resp => {
                    setTask({})
                    setDate(new Date())
                    props.getTasks()
                })
                .catch(resp => {
                    console.log(resp)
                })
        }
    }

    useEffect(() => {
        if (props.currentTask !== undefined && props.currentTask !== {} && props.currentTask.attributes) {
            setDate(new Date(props.currentTask.attributes.scheduled_at))
            setTask({
                name: props.currentTask.attributes.name,
                scheduled_at: props.currentTask.scheduled_at,
                id: props.currentTask.id
            })
        }
        
    }, []);

    return(
        <form id="taskForm" onSubmit={handleSubmit(onSubmit)}>
            <Calendar
             onChange={handleCalendarChange}
             value={date}
            />
            <input type="hidden" name="scheduled_at" value={date} ref={register()} />
            {errors.scheduled_at && "Need to select date for the task"}
            <div class="form-group mt-3">
                <input class="form-control" type="text" name="name" placeholder="Add task" ref={register()} />
                {errors.name && "Task name is required"}
            </div>
            <button type="submit" className="btn btn-primary">Save task</button>
        </form> 
    )
}

export default Taskform