/************ STATE SYSTEM ************/
let stateStore = [];
let stateIndex = 0;
let rootComponent = null;
let rootContainer = null;

/************ useState ************/
function useState(initialValue) {
    const currentIndex = stateIndex;

    if (stateStore[currentIndex] === undefined) {
        stateStore[currentIndex] = initialValue;
    }

    function setState(newValue) {
        stateStore[currentIndex] = newValue;
        render();
    }

    stateIndex++;
    return [stateStore[currentIndex], setState];
}

/************ RENDER ************/
function render() {
    stateIndex = 0;
    rootContainer.innerHTML = "";
    // rootComponent();
    Counter()
}

/************ COMPONENT ************/
function Counter() {
    const [count, setCount] = useState(0);

    const incBtn = document.createElement("button");
    incBtn.innerText = "+";
    incBtn.onclick = () => setCount(count + 1);
  
    const decBtn = document.createElement("button");
    decBtn.innerText = "-";

    decBtn.onclick = () => setCount(count - 1);

    const text = document.createElement("h1");
    text.innerText = count;

    rootContainer.appendChild(decBtn);
    rootContainer.appendChild(text);
    rootContainer.appendChild(incBtn);
}

/************ INITIAL MOUNT ************/
// rootComponent = Counter;
rootContainer = document.getElementById("root");
render();
