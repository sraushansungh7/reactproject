// What problem useState solves

// Core idea behind useState (no magic)

// Minimal architecture we need

// Full working code (tiny but powerful)

// Step-by-step execution flow

// 1️⃣ What problem does useState solve?

// Without state, your functional components are static.

function Counter() {
  return {
    type: "h1",
    props: {},
    children: "Count: 0"
  };
}

// renders once

// never changes

// cannot respond to clicks

// We need:

// data that persists between renders

// a way to re-render UI when data changes

// 2️⃣ Core idea of useState 

// At its heart, useState is just:

// an array to store values

// an index to know which state belongs to which call

// a setter that:

// updates state

// triggers re-render



// 3️⃣ Minimal architecture we need

// We’ll create 3 global things (same idea React uses internally):


let stateStore = [];
let stateIndex = 0;
let rootElement = null;
let rootContainer = null;


// Why?

// stateStore → remembers state values

// stateIndex → maps useState calls in order

// rootElement → what to re-render

// rootContainer → where to re-render


// 4️⃣ Implementing useState
// ✅ Our custom useState


function useState(initialValue) {
    const currentIndex = stateIndex;

    // Initialize state only once
    if (stateStore[currentIndex] === undefined) {
        stateStore[currentIndex] = initialValue;
    }

    function setState(newValue) {
        stateStore[currentIndex] = newValue;

        // 🔁 trigger re-render
        stateIndex = 0;
        rootContainer.innerHTML = "";
        customRender(rootElement, rootContainer);
    }

    stateIndex++;
    return [stateStore[currentIndex], setState];
}



// 5️⃣ Update customRender (small but important)

// When rendering functional components, reset stateIndex once per render.
let isInitialRender = true;

function customRender(reactElement, container) {

    // ✅ SET ROOT ONLY ONCE
    if (isInitialRender) {
        rootElement = reactElement;
        rootContainer = container;
        isInitialRender = false;
    }

    // FUNCTIONAL COMPONENT
    if (typeof reactElement.type === "function") {
        stateIndex = 0;
        const renderedElement = reactElement.type(reactElement.props);
        customRender(renderedElement, container);
        return;
    }

    const domElement = document.createElement(reactElement.type);

    // Props & events
    for (const prop in reactElement.props) {
        if (prop.startsWith("on")) {
            const eventType = prop.slice(2).toLowerCase();
            domElement.addEventListener(eventType, reactElement.props[prop]);
        } else {
            domElement.setAttribute(prop, reactElement.props[prop]);
        }
    }

    // Children
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



// 6️⃣ Example: Stateful Counter Component


function Counter() {
    const [count, setCount] = useState(0);

    return {
        type: "button",
        props: {
            onClick: () => setCount(count + 1),
            style: "padding:10px;font-size:18px"
        },
        children: `Count: ${count}`
    };
}

const App = {
    type: Counter,
    props: {},
    children: null
};

customRender(App, document.getElementById("root"));


// 7️⃣ Step-by-step execution flow (IMPORTANT)
// 🔹 Initial render

// customRender(App)

// Counter() is called

// useState(0):

// stateStore[0] = 0

// returns [0, setCount]

// Button rendered → Count: 0


// useState
//  ├─ stores value
//  ├─ returns setter
//  └─ setter triggers re-render
