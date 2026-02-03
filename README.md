# reactproject

📘 React Learning Project
📌 About This Project

This project is part of my React learning journey.
Here, I am learning how React works, how JavaScript and HTML are used inside React, how functions work in React, and how useState manages data in a component.

⚛️ What is React?

React is a JavaScript library used to build user interfaces, especially single-page applications.
Instead of updating the whole page, React updates only the parts that change, which makes apps fast and efficient.

🧩 How React Uses HTML and JavaScript

React uses JSX, which looks like HTML but works inside JavaScript.

Example:

function App() {
  return <h1>Hello React</h1>;
}


HTML-like code is written inside JavaScript

JavaScript logic and UI are combined in one place

React converts JSX into normal JavaScript

🔧 Functions in React

React components are mostly written as functions.

Example:

function App() {
  return (
    <div>
      <h2>Welcome to React</h2>
    </div>
  );
}


Each function is a component

A component returns JSX

Components can be reused anywhere in the app

🔄 How useState Works

useState is a React Hook used to manage data (state) inside a component.

Example:

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

Explanation:

count → current value

setCount → function to update the value

useState(0) → initial value is 0

When state changes, React re-renders the component automatically

🎯 What I Am Learning

React basics and project structure

JSX syntax

Functional components

State management using useState

How JavaScript controls UI updates in React

🚀 Conclusion

This project helps me understand how React works internally and how JavaScript, HTML, functions, and state are connected to build interactive web applications.
