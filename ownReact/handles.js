// 2️⃣ Core idea: How React handles events (simplified)



// React treats events differently from normal props.

// Rule:

// Props starting with on are event listeners, not attributes.

// So:
// onClick → click
// onChange → change
// onMouseEnter → mouseenter
// And instead of setAttribute, React uses:

// addEventListener


// 3️⃣ Design decision in your renderer

// We add one rule inside props loop:

// if prop starts with "on"
// → attach event
// else
// → normal attribute


// That’s it. That’s the whole event system idea.


// 4️⃣ Updated customRender with Event Support


function customRender(reactElement, container) {
    const domElement = document.createElement(reactElement.type);

    // 1️⃣ Handle props
    for (const prop in reactElement.props) {

        // ✅ EVENT HANDLING
        if (prop.startsWith("on")) {
            const eventType = prop.toLowerCase().substring(2);
            domElement.addEventListener(eventType, reactElement.props[prop]);
        } 
        // ✅ NORMAL ATTRIBUTES
        else {
            domElement.setAttribute(prop, reactElement.props[prop]);
        }
    }

    // 2️⃣ Handle children
    const children = reactElement.children;

    if (typeof children === "string") {
        domElement.textContent = children;
    } 
    else if (Array.isArray(children)) {
        children.forEach(child => customRender(child, domElement));
    } 
    else if (typeof children === "object") {
        customRender(children, domElement);
    }

    // 3️⃣ Append to container
    container.appendChild(domElement);
}


// 5️⃣ Example usage with onClick

const reactElement = {
    type: 'button',
    props: {
        onClick: () => alert("Button clicked!"),
        style: "padding:10px; font-size:16px"
    },
    children: "Click Me"
};

customRender(reactElement, document.getElementById("root"));





//// next is function.js


