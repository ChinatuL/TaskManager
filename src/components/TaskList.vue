<script setup>
import TaskItem from "./TaskItem.vue";
const props = defineProps([
    "tasks",
]);

const emits = defineEmits([
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
    <ul class="grid gap-y-2 max-w-sm px-4 pt-4 pb-8 md@px-8 md:pb-8 md:pt-0">
        <li v-for="task in tasks" :key="task.id">
            <TaskItem
                :task="task"
                @deleteTask="(id) => emits('deleteTask', id)"
                @completeTask="(id) => emits('completeTask', id)"
                @editTaskStatus="(id) => emits('editTaskStatus', id)"
                @editTask="(id, text) => emits('editTask', id, text)"
            />
        </li>
    </ul>
</template>
