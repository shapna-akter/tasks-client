import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
    const addTask = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const taskAdd = {
            name
        }

        fetch("https://task-server-ruby.vercel.app/tasks", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(taskAdd),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.log(error));
    }

    //get tasks
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            try {
                const res = await fetch('https://task-server-ruby.vercel.app/tasks', {
                })
                const data = await res.json();
                return data;
            }
            catch (error) {
            }
        }
    })
    
    const handleDeleteTask = task => {
        fetch(`https://task-server-ruby.vercel.app/tasks/${task._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <div className='text-5xl'>Loading...</div>
    }

    return (
        <div className="lg:w-1/2 w-2/4 mx-auto mt-12">
            <form onSubmit={addTask}>
                <input type="text" name='name' placeholder="Your Task" className="input input-bordered input-primary" />
                <button type='submit' className="btn btn-primary ml-4 mt-4 lg:mt-0">Add Task</button>
            </form>
            {/* pending tasks */}

            <p className='font-bold my-6'>Pending Tasks</p>

            <div className='grid grid-cols-1'>
                {
                    tasks?.map(task => <div key={task._id} className="flex flex-col lg:flex-row gap-2">
                        <p className='font-bold px-16 py-8 shadow-lg border-2 mb-2'>{task.name}</p>
                        <div className='flex flex-col gap-2 mb-4'>
                            <button className="btn btn-xs btn-outline btn-info font-bold">Complete</button>
                            <button
                                onClick={() => handleDeleteTask(task)}
                                className="btn btn-xs btn-outline btn-info font-bold">
                                Delete
                                <AiOutlineClose></AiOutlineClose>
                            </button>
                        </div>
                    </div>)
                }
            </div>

            <p className='font-bold my-6'>Completed Tasks</p>
            <div className='grid grid-cols-1'>
                <div className="flex items-center gap-12">
                    <p className='font-bold px-16 py-8 shadow-lg border-2'>Hello</p>
                </div>
            </div>
        </div>
    );
};

export default Home;