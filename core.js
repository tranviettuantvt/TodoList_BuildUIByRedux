
export default function html([first, ...strings], ...values){
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
    .filter( x => x && x!==true || x===0)
    .join('')
}

// render ra view
export function createStore(reducer) {
    let state = reducer()  // xu li va return lai state

    const roots  = new Map() //key cua Map la bat ky kieu du lieu

    function render() {
        for (const [root, component] of roots ){
            const output=component()
            root.innerHTML=output
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component)
            render()
        }, 
        connect(selector = state => state) {// khong truyen la ham lam default, co thi lay tham so moi
            return component => (props, ...args) => 
                component(Object.assign({}, props, selector(state), ...args))
        }, 
        dispatch(action, ...args) {
            state=reducer(state, action, args)
            render()
        }
    }
}