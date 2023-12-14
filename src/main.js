import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
const options = {
    position: "top-right",
    timeout: 2000,
    transition: "Vue-Toastification__fade",
    closeOnClick: true,
    hideProgressBar: true,
};
app.use(Toast, options);
app.mount("#app");
