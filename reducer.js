
import storage from "./util/storage.js"

const init = {
//    todos: [
//         {
//             title: 'Learn Javascript',
//             completed: false,
//         },
//         {
//             title: 'Goto gym',
//             completed: true,
//         }
//    ]
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editIndex: null
}

const actions={
    add({todos}, title){
        if(title){
            todos.push({title, completed:false})
            storage.set(todos)
        }
    }, 
    toggle({todos}, index){
        const todo=todos[index]
        todo.completed=!todo.completed
    },
    toggleAll({todos}, completed){
        todos.forEach(todo => todo.completed=completed)
        storage.set(todos)
    },
    delete({todos}, index) {
        let newTodos=todos.splice(index,1)
        storage.set(newTodos)
    },
    switchType(state, type){   
        state.filter=type
    },
    clearCompleted(state){
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    editIndex(state, index){
        state.editIndex=index
    },
    endEdit(state, title){
        if(state.editIndex !==null){
            if(title){
                state.todos[state.editIndex].title=title
                state.editIndex = null
                storage.set(state.todos)
            } else {
                this.delete(state, state.editIndex)
            }
        }
    },
    cancelEdit(state){
        state.editIndex = null
    }
}

// dispatch(action, ...args) +> reducer(state=init, action, args)
export default function reducer(state=init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
    
}