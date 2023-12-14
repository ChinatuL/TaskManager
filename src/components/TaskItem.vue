<script setup>
import { ref } from "vue";
const props = defineProps(["task"]);
const emits = defineEmits([
    "deleteTask",
    "completeTask",
    "editTaskStatus",
    "editTask",
]);

const inputValue= ref(props.task.text);
</script>

<template>
    <div class="grid grid-template-cols items-center">
        <input
            type="checkbox"
            :checked="task.completed"
            @change="emits('completeTask', task.id)"
            class="checkbox checkbox-xs mr-4"
        />

        <input
            type="text"
            v-if="task.edit"
            v-model="inputValue"
            @keyup.enter="emits('editTask', task.id, inputValue)"
            class="input input-sm input-bordered w-56"
        />

        <p v-else :class="{ 'line-through': task.completed }">{{ task.text }}</p>

        <div class="flex gap-2">
            <button
                aria-label="edit task"
                v-if="!task.edit"
                v-show="!task.completed"
                class="btn btn-ghost btn-sm"
                @click="emits('editTaskStatus', task.id)"
            >
                <i class="fa-regular fa-pen-to-square"></i>
            </button>

            <button
                aria-label="edit task"
                v-else
                v-show="!task.completed"
                class="btn btn-ghost btn-sm"
                @click="emits('editTask', task.id, inputValue)"
            >
                <i class="fa-solid fa-check"></i>
            </button>

            <button
                aria-label="delete task"
                class="btn btn-ghost btn-sm"
                @click="emits('deleteTask', task.id)"
            >
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    </div>
</template>

