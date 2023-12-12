<script setup>
import { ref } from "vue";

const props = defineProps(["addTask"]);

const todo = ref("");

const handleSubmit = (e) => {
  e.preventDefault();
    if (!todo.value) return;
    props.addTask(todo.value);
    todo.value = "";
};
</script>

<template>
    <form @submit="handleSubmit" class=" w-[90vw] mx-auto md:w-96 bg-base-100 pt-8 px-4 md:p-8">
        <div class="form-control flex flex-row gap-4 ">
            <input
                type="text"
                class="input input-bordered w-full"
                v-model="todo"
                placeholder="Add a task"
            />
            <button
                type="submit"
                class="btn btn-ghost btn-circle btn-md"
                aria-label="add task"
            >
                <i class="fa-solid fa-plus fa-xl"></i>
            </button>
        </div>
    </form>
</template>
