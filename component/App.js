import html from "../core.js";
import {connect} from '../store.js'
import Footer from "./Footer.js";
import Header from "./Header.js";
import TodoList from "./TodoList.js";

const connector= connect()

function App({todos}) {
    return html`
    <section class="todoapp">
        ${Header()}
        ${todos.length>0 && TodoList()}
        ${todos.length>0 && Footer()}
    </section>
    `
}

export default connector(App)