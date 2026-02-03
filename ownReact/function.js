// 1️⃣ What is a functional component (core idea)

// In React:

// function Button(props) {
//   return <button>{props.text}</button>;
// }


// Key truth:

// A functional component is just a function that returns a reactElement object

// There is no DOM here yet.

// 2️⃣ Why your current renderer fails

// Your renderer assumes:

// reactElement.type === "div" | "a" | "button"


// But with functional components:

// type: Button   // ← function, not string


// So this breaks:

// document.createElement(reactElement.type); // ❌


// Because:

// document.createElement(fn) is invalid

// 3️⃣ The ONE rule to support functional components

// Before creating a DOM element, check:

// If type is a function → call it

// That’s it.

// if (typeof reactElement.type === "function") {
//     const renderedElement = reactElement.type(reactElement.props);
//     customRender(renderedElement, container);
//     return;
// }


// This mirrors React exactly.

// 4️⃣ Final customRender with Functional Components



function customRender(reactElement, container) {

    // 🔥 FUNCTIONAL COMPONENT HANDLING
    if (typeof reactElement.type === "function") {
        const renderedElement = reactElement.type(reactElement.props);
        customRender(renderedElement, container);
        return;
    }

    const domElement = document.createElement(reactElement.type);

    // Props (attributes + events)
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
    } else if (Array.isArray(children)) {
        children.forEach(child => customRender(child, domElement));
    } else if (typeof children === "object") {
        customRender(children, domElement);
    }

    container.appendChild(domElement);
}

// 5️⃣ Example Functional Component


function Link(props) {
    return {
        type: 'a',
        props: {
            href: props.href,
            target: '_blank'
        },
        children: props.text
    };
}


const reactElement = {
    type: Link,
    props: {
        href: 'https://google.com',
        text: 'Visit Google'
    },
    children: "there was google"
};

customRender(reactElement, document.getElementById("root"));



//// next UseState 