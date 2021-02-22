(this.webpackJsonptodomvc=this.webpackJsonptodomvc||[]).push([[0],{13:function(e,t,o){e.exports=o(27)},27:function(e,t,o){"use strict";o.r(t);var a=o(0),n=o.n(a),l=o(4),r=(o(18),o(3)),s=o(6),c=o(2),i=o.n(c);class d extends a.Component{constructor(...e){super(...e),this.state={text:this.props.text||""},this.handleSubmit=e=>{const t=e.target.value.trim();13===e.which&&(this.props.onSave(t),this.props.newTodo&&this.setState({text:""}))},this.handleChange=e=>{this.setState({text:e.target.value})},this.handleBlur=e=>{this.props.newTodo||this.props.onSave(e.target.value)}}render(){return n.a.createElement("input",{className:i()({edit:this.props.editing,"new-todo":this.props.newTodo}),type:"text",placeholder:this.props.placeholder,autoFocus:!0,value:this.state.text,onBlur:this.handleBlur,onChange:this.handleChange,onKeyDown:this.handleSubmit})}}var p=({addTodo:e})=>n.a.createElement("header",{className:"header"},n.a.createElement("h1",null,"todos"),n.a.createElement(d,{newTodo:!0,onSave:t=>{0!==t.length&&e(t)},placeholder:"What needs to be done?"}));const h={show_all:"All",show_active:"Active",show_completed:"Completed"};var m=({visibilityFilter:e,activeCount:t,completedCount:o,setFilter:a,clearCompleted:l})=>{const r=1===t?"item":"items";return n.a.createElement("footer",{className:"footer"},n.a.createElement("span",{className:"todo-count"},n.a.createElement("strong",null,t||"No")," ",r," left"),n.a.createElement("ul",{className:"filters"},Object.keys(h).map(t=>n.a.createElement("li",{key:t},n.a.createElement("a",{className:i()({selected:t===e}),style:{cursor:"pointer"},onClick:()=>a(t)},h[t])))),!!o&&n.a.createElement("button",{className:"clear-completed",onClick:l},"Clear completed"))};class u extends a.Component{constructor(...e){super(...e),this.state={editing:!1},this.handleDoubleClick=()=>{this.setState({editing:!0})},this.handleSave=(e,t)=>{0===t.length?this.props.deleteTodo(e._id):this.props.editTodo(e,t),this.setState({editing:!1})}}render(){const e=this.props,t=e.todo,o=e.toggleTodo,a=e.deleteTodo;let l;return l=this.state.editing?n.a.createElement(d,{text:t.text,editing:this.state.editing,onSave:e=>this.handleSave(t,e)}):n.a.createElement("div",{className:"view"},n.a.createElement("input",{className:"toggle",type:"checkbox",checked:t.completed,onChange:()=>o(t._id)}),n.a.createElement("label",{onDoubleClick:this.handleDoubleClick},t.text),n.a.createElement("button",{className:"destroy",onClick:()=>a(t._id)})),n.a.createElement("li",{key:i()({id:t._id}),className:i()({completed:t.completed,editing:this.state.editing})},l)}}var g=({todos:e,editTodo:t,deleteTodo:o,toggleTodo:a})=>n.a.createElement("ul",{className:"todo-list"},e.map(e=>n.a.createElement(u,{key:e.id,todo:e,editTodo:t,toggleTodo:a,deleteTodo:o})));var E=({todos:e,deleteTodo:t,editTodo:o,toggleTodo:l,toggleAllTodo:r,clearCompleted:c})=>{const i=Object(a.useState)("show_all"),d=Object(s.a)(i,2),p=d[0],h=d[1],u=e.length,E=e.filter(({completed:e})=>e).length;let b;switch(p){case"show_all":b=e;break;case"show_completed":b=e.filter(e=>e.completed);break;case"show_active":b=e.filter(e=>!e.completed);break;default:throw new Error("Unknown filter: "+p)}return n.a.createElement("section",{className:"main"},!!u&&n.a.createElement("span",null,n.a.createElement("input",{className:"toggle-all",type:"checkbox",checked:E===u,readOnly:!0}),n.a.createElement("label",{onClick:r})),n.a.createElement(g,{todos:b,deleteTodo:t,editTodo:o,toggleTodo:l}),!!u&&n.a.createElement(m,{visibilityFilter:p,setFilter:h,completedCount:E,activeCount:u-E,clearCompleted:c}))};var b=e=>{const t=e.isError;return console.log(t),t?n.a.createElement("div",{style:{textAlign:"center",fontSize:"16px"}},n.a.createElement("h2",null,"Error of reading or writing file on server")):null},T=o(5),v=o(7);const k=Object(v.b)({name:"myError",initialState:!1,reducers:{setError:e=>!e}}),f=k.actions.setError;var y=k.reducer;const C={setError:f};var j=Object(T.b)(e=>({hasError:e}),C)(e=>{const t=e.hasError,o=e.setError,l=Object(a.useState)([]),c=Object(s.a)(l,2),i=c[0],d=c[1];Object(a.useEffect)(()=>{h()},[]);const h=()=>{fetch("/api",{mode:"no-cors",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer: token"}}).then(e=>{if(e.ok)return e.json();o()}).then(e=>d(e))};return n.a.createElement(n.a.Fragment,null,!t&&n.a.createElement("div",null,n.a.createElement(p,{addTodo:e=>{const t={_id:Math.random(),text:e,completed:!1};fetch("/api",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer: token"},body:JSON.stringify(t)}).then(e=>{if(e.ok)return e.json();o(!0)}).then(e=>d([...i,e]))}}),n.a.createElement(E,{todos:i,deleteTodo:e=>{fetch("/api/todo/".concat(e),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer: token"},body:JSON.stringify({id:e})}).then(e=>{if(e.ok)return e.json();o(!0)}).then(()=>{h(),d(i)})},editTodo:(e,t)=>{const a={text:t,_id:e._id,completed:e.completed};fetch("/api/todo/".concat(e._id),{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer: token"},body:JSON.stringify(a)}).then(e=>{if(e.ok)return e.json();o(!0)}).then(e=>{d(i.map(t=>t._id===e._id?e:t))})},toggleTodo:e=>{d(i.map(t=>t._id===e?Object(r.a)(Object(r.a)({},t),{},{completed:!t.completed}):t))},toggleAllTodo:()=>{const e=i.every(e=>e.completed);d(i.map(t=>Object(r.a)(Object(r.a)({},t),{},{completed:!e})))},clearCompleted:()=>{d(i.filter(e=>!1===e.completed))}})),n.a.createElement(b,{isError:t}))});const w=Object(v.a)({reducer:y});Object(l.render)(n.a.createElement(T.a,{store:w},n.a.createElement(j,null)),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.543cd0ab.chunk.js.map