(this.webpackJsonptodomvc=this.webpackJsonptodomvc||[]).push([[0],{36:function(e,t,o){e.exports=o(73)},73:function(e,t,o){"use strict";o.r(t);var a=o(0),l=o.n(a),c=o(9),s=o(1),d=o(35),n=o(10),r=o(2),i=o.n(r);class m extends a.Component{constructor(...e){super(...e),this.state={text:this.props.text||""},this.handleSubmit=e=>{const t=e.target.value.trim();13===e.which&&(this.props.onSave(t),this.props.newTodo&&this.setState({text:""}))},this.handleChange=e=>{this.setState({text:e.target.value})},this.handleBlur=e=>{this.props.newTodo||this.props.onSave(e.target.value)}}render(){return l.a.createElement("input",{className:i()({edit:this.props.editing,"new-todo":this.props.newTodo}),type:"text",placeholder:this.props.placeholder,autoFocus:!0,value:this.state.text,onBlur:this.handleBlur,onChange:this.handleChange,onKeyDown:this.handleSubmit})}}var p=({addTodo:e})=>l.a.createElement("header",{className:"header"},l.a.createElement("h1",null,"todos"),l.a.createElement(m,{newTodo:!0,onSave:t=>{0!==t.length&&e(t)},placeholder:"What needs to be done?"}));const h={show_all:"All",show_active:"Active",show_completed:"Completed"};var u=({visibilityFilter:e,activeCount:t,completedCount:o,setFilter:a,clearCompleted:c})=>{const s=1===t?"item":"items";return l.a.createElement("footer",{className:"footer"},l.a.createElement("span",{className:"todo-count"},l.a.createElement("strong",null,t||"No")," ",s," left"),l.a.createElement("ul",{className:"filters"},Object.keys(h).map(t=>l.a.createElement("li",{key:t},l.a.createElement("a",{className:i()({selected:t===e}),style:{cursor:"pointer"},onClick:()=>a(t)},h[t])))),!!o&&l.a.createElement("button",{className:"clear-completed",onClick:c},"Clear completed"))},E=o(33),T=o.n(E)()("http://localhost:8000",{transports:["websocket","polling","flashsocket"]});class b extends a.Component{constructor(...e){super(...e),this.state={editing:!1},this.handleDoubleClick=()=>{this.setState({editing:!0})},this.handleSave=(e,t)=>{0===t.length?this.props.deleteTodo(e):this.props.editTodo(e,t),this.setState({editing:!1})}}render(){const e=this.props,t=e.todo,o=e.completeTodo,a=e.deleteTodo;let c;return c=this.state.editing?l.a.createElement(m,{text:t.text,editing:this.state.editing,onSave:e=>this.handleSave(t._id,e)}):l.a.createElement("div",{className:"view"},l.a.createElement("input",{className:"toggle",type:"checkbox",checked:t.completed,onChange:()=>o(t)}),l.a.createElement("label",{onDoubleClick:this.handleDoubleClick},t.text),l.a.createElement("button",{className:"destroy",onClick:()=>a(t)})),l.a.createElement("li",{key:i()({id:t._id}),className:i()({completed:t.completed,editing:this.state.editing})},c)}}var g=({todos:e,editTodo:t,deleteTodo:o,completeTodo:a})=>l.a.createElement("ul",{className:"todo-list"},e.map(e=>l.a.createElement(b,{key:e.id,todo:e,editTodo:t,completeTodo:a,deleteTodo:o})));var O=({todos:e,deleteTodo:t,editTodo:o,completeTodo:c,toggleAllTodo:s,clearCompleted:d})=>{const r=Object(a.useState)("show_all"),i=Object(n.a)(r,2),m=i[0],p=i[1],h=e.length,E=e.filter(({completed:e})=>e).length;let T;switch(m){case"show_all":T=e;break;case"show_completed":T=e.filter(e=>e.completed);break;case"show_active":T=e.filter(e=>!e.completed);break;default:throw new Error("Unknown filter: "+m)}return l.a.createElement("section",{className:"main"},!!h&&l.a.createElement("span",null,l.a.createElement("input",{className:"toggle-all",type:"checkbox",checked:E===h,readOnly:!0}),l.a.createElement("label",{onClick:s})),l.a.createElement(g,{todos:T,deleteTodo:t,editTodo:o,completeTodo:c}),!!h&&l.a.createElement(u,{visibilityFilter:m,setFilter:p,completedCount:E,activeCount:h-E,clearCompleted:d}))};var v=()=>{const e=Object(a.useState)([]),t=Object(n.a)(e,2),o=t[0],c=t[1];Object(a.useEffect)(()=>{T.emit("getTodos"),T.on("TodoSend",e=>{c(e)})},[]);return l.a.createElement("div",null,l.a.createElement(p,{addTodo:e=>{const t=Math.random();T.emit("addTodo",{id:t,text:e,completed:!1})}}),l.a.createElement(O,{todos:o,deleteTodo:e=>{T.emit("deleteTodo",e)},editTodo:(e,t)=>{T.emit("updateTodo",{id:e,text:t,completed:!1})},completeTodo:e=>{T.emit("completeTodo",{id:e._id,text:e.text,completed:!e.completed})},toggleAllTodo:()=>{o.every(e=>e.completed)},clearCompleted:()=>{}}))},C=o(3);const k=[];var w=Object(s.c)({todos:function(e=k,t){switch(t.type){case"NEW_TODOS_DATA":return[t.payload];case"GET_TODOS":case"ADD_TODO":return[...e];case"DELETE_TODO":return e.filter(e=>e.id!==t.todo.id);case"EDIT_TODO":return e.map(e=>e.id===t.id?Object(C.a)(Object(C.a)({},e),{},{text:t.text}):e);case"COMPLETE_TODO":return e.map(e=>(console.log(t),e.id===t.todo.id?Object(C.a)(Object(C.a)({},e),{},{completed:!t.todo.completed}):e));case"COMPLETE_ALL":const o=e.every(e=>e.completed);return e.map(e=>Object(C.a)(Object(C.a)({},e),{},{completed:!o}));case"CLEAR_COMPLETED":return e.filter(e=>!1===e.completed);default:return e}}}),x=(o(72),o(34));const _=Object(s.d)(w,Object(s.a)(x.a));Object(c.render)(l.a.createElement(d.a,{store:_},l.a.createElement(v,null)),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.8d281fd7.chunk.js.map