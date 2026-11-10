import "@rblez-ui/tokens/css";
import "@rblez-ui/tokens/components.css";
import "@rblez-ui/tokens/prompt-input.css";
import "./style.css";
import { mount } from "svelte";
import App from "./App.svelte";

mount(App, { target: document.getElementById("app")! });
