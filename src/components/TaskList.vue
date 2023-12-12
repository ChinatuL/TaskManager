<script setup>
import TaskItem from "./TaskItem.vue";
const props = defineProps([
    "tasks",
    "deleteTask",
    "completeTask",
    "editTaskStatus",
    "editTask",
]);
</script>
<template>
    <h2
        v-show="tasks.length === 0"
        class="flex justify-center items-center text-2xl font-bold"
    >
        No tasks
    </h2>
    <ul class="grid gap-y-2 max-w-sm px-4 md:px-8 md:pb-8">
        <li v-for="task in tasks" :key="task.id">
            <TaskItem
                :task="task"
                :deleteTask="deleteTask"
                :completeTask="completeTask"
                :editTaskStatus="editTaskStatus"
                :editTask="editTask"
            />
        </li>
    </ul>
</template>
