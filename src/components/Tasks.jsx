import styles from './Tasks.module.css';

import clipboard from '../assets/clipboard.svg';
import { Trash, PlusCircle } from 'phosphor-react';
import { useState } from 'react';

export function Tasks({ content }) {

    const [tasks, setTasks] = useState([])
    const [newTaskText, setNewTaskText] = useState('')
    const [completedTasks, setCompletedTasks] = useState(0)
    const [idTaskQueue, setIdTaskQueue] = useState([])

    function handleCheckTheMarkedTasks(e) {
        
        if(e.currentTarget.checked) {
            setCompletedTasks(completedTasks + 1)
            setIdTaskQueue([...idTaskQueue, e.currentTarget.id])
            return
        }
        setIdTaskQueue(idTaskQueue.filter(id => id !== e.currentTarget.id))
        setCompletedTasks(completedTasks - 1)          
        return
    } 

    const taskCount = tasks.length;

    function handleCreateNewTask() {
        event.preventDefault()
        setTasks([...tasks, { id: tasks.length + 1, content: newTaskText}])
        setNewTaskText('')
    }

    function handleNewTaskChange() {
        setNewTaskText(event.target.value)
    }
 
    function handleDeleteTask(e) {
        const taskDelete = tasks.filter(task => task.id != e.currentTarget.id)
        setTasks(taskDelete)

        if(idTaskQueue.includes(e.currentTarget.id)) {
            setCompletedTasks(completedTasks -1)
        }
    }

    return (  

        <div className={styles.tasks}>
            <div className={styles.createTask}>
                <form onSubmit={handleCreateNewTask}>
                    <input 
                        type="text" 
                        name="tasks"
                        value={newTaskText}
                        placeholder="Adicione uma nova tarefa"
                        onChange={handleNewTaskChange}
                        required
                    />

                    <button>
                        Criar
                        <PlusCircle size={16} />
                    </button>
                </form>
            </div>

            <div className={styles.header}>
                <span>
                    Tarefas criadas
                  <span>{taskCount}</span>
                </span>

                <span>
                    Concluídas 
                    {completedTasks === 0 ? <span>0</span>: <span> {completedTasks} de {taskCount}</span>} 
                    
                </span>
            </div>

            <div className={styles.toDoList}>
                <div className={taskCount !== 0 ? styles.hideNoTasks : styles.noTasks}>
                    <img src={clipboard} alt="Imagem ilustrativa de um ícone de uma prancheta" />

                    <span>Você ainda não tem tarefas cadastradas</span>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                </div>


                {
                    tasks.map(task => {
                        return (
                            <div key={task.id} className={styles.boxWithTasks}>
                                <div className={styles.infoTask}>
                                    <input
                                        id={`${task.id}`}                                    
                                        type="checkbox"  
                                        className={styles.checkbox}
                                        onChange={handleCheckTheMarkedTasks}
                                    />

                                    <label htmlFor={`${task.id}`}>
                                        {task.content}
                                    </label>
                                </div>
                                    <button 
                                        id={`${task.id}`}                                      
                                        onClick={handleDeleteTask}  
                                    >
                                        <Trash size={20} />
                                    </button>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}