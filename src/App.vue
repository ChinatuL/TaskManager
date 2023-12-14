<script setup>
import { ref, watchEffect, computed } from "vue";
import { nanoid } from "nanoid";
import { useToast } from "vue-toastification";

import Header from "./components/Header.vue";
import FormInput from "./components/FormInput.vue";
import TaskList from "./components/TaskList.vue";


const setLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const toast = useToast();

const TaskStatus = {
    All: "all",
    Completed: "completed",
    Incomplete: "incomplete",
}

const category = ref("all");
const categories = [
    {
        text: "All Tasks",
        event: TaskStatus.All,
    },
    {
        text: "Pending",
        event: TaskStatus.Incomplete,
    },
    {
        text: "Done",
        event: TaskStatus.Completed,
    },
];

const defaultList = JSON.parse(localStorage.getItem("tasks")) || [];

const tasks = ref(defaultList);
const filteredTask = computed(() => {
    switch (category.value) {
        case TaskStatus.All:
            return tasks.value;
        case TaskStatus.Completed:
            return tasks.value.filter((task) => task.completed);
        case TaskStatus.Incomplete:
            return tasks.value.filter((task) => !task.completed);
        default:
            return [];
    }
});

watchEffect(() => {
    setLocalStorage(tasks.value);
});

function addTask(task) {
    const newTask = { id: nanoid(), text: task, completed: false, edit: false };
    const newTasks = [...tasks.value, newTask];

    tasks.value = newTasks;

    toast.success("Task added");
}

function deleteTask(id) {
    const newTasks = tasks.value.filter((task) => task.id !== id);
    tasks.value = newTasks;
    toast.error("Task deleted");
}

function completeTask(id) {
    const newTasks = tasks.value.map((task) => {
        if (task.id === id) {
            const newTask = { ...task, completed: !task.completed };
            newTask.completed
                ? toast.success("Task completed")
                : toast.error("Task incomplete");
            return newTask;
        }
        return task;
    });
    tasks.value = newTasks;
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
    toast.success("Task edited");
}

function clearTasks() {
    tasks.value = [];
}

function filterTasks(__category) {
    category.value = __category;
}
</script>

<template>
    <Header 
        :categories="categories" 
        :activeCategory="category" 
        @filterTasks="filterTasks" 
    />

    <main
        class="flex flex-col justify-center items-center w-screen max-w-[90vw] mt-20 mb-8 mx-auto"
    >
        <div class="card shadow-lg">
            <FormInput :addTask="addTask" />
            <TaskList
                :tasks="filteredTask"
                @deleteTask="deleteTask"
                @completeTask="completeTask"
                @editTaskStatus="editTaskStatus"
                @editTask="editTask"
            />
        </div>

        <button
            v-show="tasks.length > 0"
            class="btn btn-neutral mt-8 w-40 hover:opacity-70"
            @click="clearTasks"
        >
            Clear All
        </button>
    </main>
</template>

