import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import firestore from './firebase-config.js';

const taskCollection = collection(firestore, 'tasks');

export async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName === '') {
        alert('No se permiten campos vacios...')
        return;
    }

    await addDoc(taskCollection, {
        name: taskName,
        completed: false
    });

    taskInput.value = ''; 

    displayTasks();
}

export async function deleteTask(taskId) {
    if (confirm('¿Estás seguro de eliminar la tarea?')) {
        await deleteDoc(doc(taskCollection, taskId));

        displayTasks();
    }
}

// Função para editar uma tarefa
export async function editTask(taskId, newTaskName) {
    const taskDocRef = doc(taskCollection, taskId);
    await updateDoc(taskDocRef, { name: newTaskName });

    displayTasks();
}

// Função para exibir as tarefas a partir do Firestore
export function displayTasks() {
    onSnapshot(taskCollection, (snapshot) => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; 

        snapshot.forEach((doc) => {
            const task = doc.data();
            const taskId = doc.id;

            const li = document.createElement('li');
            li.textContent = task.name;
            li.setAttribute('data-id', taskId);
            li.classList.add('task-item');
            li.addEventListener('click', async () => {
                await updateTaskCompletion(taskId, !task.completed);
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', (event) => {
                event.stopPropagation();
                openEditModal(taskId, task.name);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                deleteTask(taskId);
            });

            li.appendChild(editButton);
            li.appendChild(deleteButton);

            if (task.completed) {
                li.classList.add('completed');
            }

            taskList.appendChild(li);
        });
    });
}

function openEditModal(taskId, currentTaskName) {
    const newTaskName = prompt('Edita el nombre de la tarea:', currentTaskName);
    if (newTaskName !== null) {
        editTask(taskId, newTaskName);
    }
}

async function updateTaskCompletion(taskId, completed) {
    const taskDocRef = doc(taskCollection, taskId);
    await updateDoc(taskDocRef, { completed: completed });
}

document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});

window.addTask = addTask;
