<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";

import Header from "./components/Header.vue";
import FormInput from "./components/FormInput.vue";
import TaskList from "./components/TaskList.vue";

const category = ref("all");

const defaultList = JSON.parse(localStorage.getItem("tasks")) || [];

const tasks = ref(defaultList);

const setLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function addTask(task) {
    const newTask = { id: nanoid(), text: task, completed: false, edit: false };
    const newTasks = [...tasks.value, newTask];
    tasks.value = newTasks;
    setLocalStorage(newTasks);
}

function deleteTask(id) {
    const newTasks = tasks.value.filter((task) => task.id !== id);
    tasks.value = newTasks;
    setLocalStorage(newTasks);
}

function completeTask(id) {
    const newTasks = tasks.value.map((task) => {
        if (task.id === id) {
            const newTask = { ...task, completed: !task.completed };
            return newTask;
        }
        return task;
    });
    tasks.value = newTasks;
    setLocalStorage(newTasks);
}

function editTaskStatus(id) {
    const newTasks = tasks.value.map((task) => {
        if (task.id === id) {
            const newTask = { ...task, edit: true };
            return newTask;
        }
        return task;
    });
    tasks.value = newTasks;
    setLocalStorage(newTasks);
}

function editTask(id, text) {
    const newTasks = tasks.value.map((task) => {
        if (task.id === id) {
            const newTask = { ...task, text: text, edit: false };
            return newTask;
        }
        return task;
    });
    tasks.value = newTasks;
    setLocalStorage(newTasks);
}

function clearTasks() {
    tasks.value = [];
    localStorage.removeItem("tasks");
}

function filterTasks(category) {
    if (category === "all") {
        tasks.value = defaultList;
    } else if (category === "completed") {
        const completedTasks = defaultList.filter((task) => task.completed);
        tasks.value = completedTasks;
    } else if (category === "incomplete") {
        const incompleteTasks = defaultList.filter((task) => !task.completed);
        tasks.value = incompleteTasks;
    }
}
</script>

<template>
    <Header :filterTasks="filterTasks" />
    <main
        class="flex flex-col justify-center items-center w-screen max-w-[90vw] mt-20 mb-8 mx-auto"
    >
        <div class="card shadow-lg">
            <FormInput :addTask="addTask" />
            <TaskList
                :tasks="tasks"
                :deleteTask="deleteTask"
                :completeTask="completeTask"
                :editTaskStatus="editTaskStatus"
                :editTask="editTask"
            />
        </div>
    </main>
</template>

<style scoped></style>
