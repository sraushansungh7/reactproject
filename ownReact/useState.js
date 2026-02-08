/*********************************
 * GLOBAL RENDER STATE
 *********************************/
let stateStore = [];
let stateIndex = 0;

let rootElement = null;
let rootContainer = null;

/*********************************
 * useState IMPLEMENTATION
 *********************************/
function useState(initialValue) {
    const currentIndex = stateIndex;

    if (stateStore[currentIndex] === undefined) {
        stateStore[currentIndex] = initialValue;
    }

    function setState(newValue) {
        stateStore[currentIndex] = newValue;
        renderRoot();
    }

    stateIndex++;
    return [stateStore[currentIndex], setState];
}

/*********************************
 * ROOT RENDERER
 *********************************/
function renderRoot() {
    stateIndex = 0;
    rootContainer.innerHTML = "";
    customRender(rootElement, rootContainer);
}

/*********************************
 * CUSTOM RENDER FUNCTION
 *********************************/
function customRender(reactElement, container) {

    // Save root once
    if (!rootElement) {
        rootElement = reactElement;
        rootContainer = container;
    }

    // FUNCTIONAL COMPONENT
    if (typeof reactElement.type === "function") {
        const childElement = reactElement.type(reactElement.props || {});
        customRender(childElement, container);
        return;
    }

    // CREATE DOM NODE
    const domElement = document.createElement(reactElement.type);

    // HANDLE PROPS & EVENTS
    const props = reactElement.props || {};
    for (const prop in props) {
        if (prop.startsWith("on")) {
            const eventType = prop.slice(2).toLowerCase();
            domElement.addEventListener(eventType, props[prop]);
        } else {
            domElement.setAttribute(prop, props[prop]);
        }
    }

    // HANDLE CHILDREN
    const children = reactElement.children;

    if (typeof children === "string") {
        domElement.textContent = children;
    }
    else if (Array.isArray(children)) {
        children.forEach(child => customRender(child, domElement));
    }
    else if (typeof children === "object" && children !== null) {
        customRender(children, domElement);
    }

    container.appendChild(domElement);
}

/*********************************
 * COMPONENTS
 *********************************/
function Counter() {
    const [count, setCount] = useState(0);

    return {
        type: "button",
        props: {
            onClick: () => setCount(count + 1),
            style: "padding:10px;margin:10px;font-size:18px"
        },
        children: `Increment: ${count}`
    };
}

function DecrementCounter() {
    const [count, setCount] = useState(0);

    return {
        type: "button",
        props: {
            onClick: () => setCount(count - 1),
            style: "padding:10px;margin:10px;font-size:18px"
        },
        children: `Decrement: ${count}`
    };
}

function App() {
    return {
        type: "div",
        props: { style: "display:flex;gap:10px" },
        children: [
            { type: Counter, props: {}, children: null },
            { type: DecrementCounter, props: {}, children: null }
        ]
    };
}

/*********************************
 * INITIAL RENDER
 *********************************/
customRender(
    { type: App, props: {}, children: null },
    document.getElementById("root")
);
