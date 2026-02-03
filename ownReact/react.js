

// const root = document.getElementById('root');





const reactElement={
    type:'div',
    props:{class:'container'},
    children:[
        {
            type:'h1',
            props:{},
            children:'hello'
        },

        {
            type:'a',
            props:{
                href:'https://google.com',
                target:'_blank'
            },
            children:'google'
        },

        {
            type:'a',
            props:{
                href:'https://microsoft.com',
                target:'_blank'
            },
            children:'microsoft'
        },
    ]
}

function customRender(reactElement,container){
    const domelement=document.createElement(reactElement.type);
    for(const prop in reactElement.props){
        domelement.setAttribute(prop,reactElement.props[prop]);

    }
    const children=reactElement.children;
    if(typeof children==='string'){
        domelement.textContent=children;
    }else if(Array.isArray(children)){
        children.forEach(child=>{
            customRender(child,domelement);
        });
    }
    else if(typeof children==='object'){
        customRender(children,domelement);
    }
    container.appendChild(domelement);
}

customRender(reactElement, root);


//the above section has problem in But this does NOT work for events.
// 1️⃣ The problem

// Right now, your renderer only does this:

// domElement.setAttribute(prop, reactElement.props[prop]);


// But this does NOT work for events.
// props: {
//   onClick: () => alert("clicked")
// }
// Because:

// setAttribute("onClick", fn) ❌

// Browser expects real event listeners, not strings/functions


/// go to handles.js this is eventhandlers???


