(this.webpackJsonptodomvc=this.webpackJsonptodomvc||[]).push([[0],{12:function(e,t,o){"use strict";o.r(t);var a=o(0),n=o.n(a),l=o(5),i=o.n(l),c=(o(11),o(3)),s=o(2),r=o(1),d=o.n(r);class p extends a.Component{constructor(...e){super(...e),this.state={text:this.props.text||""},this.handleSubmit=e=>{const t=e.target.value.trim();13===e.which&&(this.props.onSave(t),this.props.newTodo&&this.setState({text:""}))},this.handleChange=e=>{this.setState({text:e.target.value})},this.handleBlur=e=>{this.props.newTodo||this.props.onSave(e.target.value)}}render(){return n.a.createElement("input",{className:d()({edit:this.props.editing,"new-todo":this.props.newTodo}),type:"text",placeholder:this.props.placeholder,autoFocus:!0,value:this.state.text,onBlur:this.handleBlur,onChange:this.handleChange,onKeyDown:this.handleSubmit})}}var h=({addTodo:e})=>n.a.createElement("header",{className:"header"},n.a.createElement("h1",null,"todos"),n.a.createElement(p,{newTodo:!0,onSave:t=>{0!==t.length&&e(t)},placeholder:"What needs to be done?"}));const m={show_all:"All",show_active:"Active",show_completed:"Completed"};var u=({visibilityFilter:e,activeCount:t,completedCount:o,setFilter:a,clearCompleted:l})=>{const i=1===t?"item":"items";return n.a.createElement("footer",{className:"footer"},n.a.createElement("span",{className:"todo-count"},n.a.createElement("strong",null,t||"No")," ",i," left"),n.a.createElement("ul",{className:"filters"},Object.keys(m).map(t=>n.a.createElement("li",{key:t},n.a.createElement("a",{className:d()({selected:t===e}),style:{cursor:"pointer"},onClick:()=>a(t)},m[t])))),!!o&&n.a.createElement("button",{className:"clear-completed",onClick:l},"Clear completed"))};class g extends a.Component{constructor(...e){super(...e),this.state={editing:!1},this.handleDoubleClick=()=>{this.setState({editing:!0})},this.handleSave=(e,t)=>{0===t.length?this.props.deleteTodo(e._id):this.props.editTodo(e,t),this.setState({editing:!1})}}render(){const e=this.props,t=e.todo,o=e.toggleTodo,a=e.deleteTodo;let l;return l=this.state.editing?n.a.createElement(p,{text:t.text,editing:this.state.editing,onSave:e=>this.handleSave(t,e)}):n.a.createElement("div",{className:"view"},n.a.createElement("input",{className:"toggle",type:"checkbox",checked:t.completed,onChange:()=>o(t._id)}),n.a.createElement("label",{onDoubleClick:this.handleDoubleClick},t.text),n.a.createElement("button",{className:"destroy",onClick:()=>a(t._id)})),n.a.createElement("li",{key:d()({id:t._id}),className:d()({completed:t.completed,editing:this.state.editing})},l)}}var E=({todos:e,editTodo:t,deleteTodo:o,toggleTodo:a})=>n.a.createElement("ul",{className:"todo-list"},e.map(e=>n.a.createElement(g,{key:e.id,todo:e,editTodo:t,toggleTodo:a,deleteTodo:o})));var b=({todos:e,deleteTodo:t,editTodo:o,toggleTodo:l,toggleAllTodo:i,clearCompleted:c})=>{const r=Object(a.useState)("show_all"),d=Object(s.a)(r,2),p=d[0],h=d[1],m=e.length,g=e.filter(({completed:e})=>e).length;let b;switch(p){case"show_all":b=e;break;case"show_completed":b=e.filter(e=>e.completed);break;case"show_active":b=e.filter(e=>!e.completed);break;default:throw new Error("Unknown filter: "+p)}return n.a.createElement("section",{className:"main"},!!m&&n.a.createElement("span",null,n.a.createElement("input",{className:"toggle-all",type:"checkbox",checked:g===m,readOnly:!0}),n.a.createElement("label",{onClick:i})),n.a.createElement(E,{todos:b,deleteTodo:t,editTodo:o,toggleTodo:l}),!!m&&n.a.createElement(u,{visibilityFilter:p,setFilter:h,completedCount:g,activeCount:m-g,clearCompleted:c}))};function T(){return n.a.createElement("div",{style:{textAlign:"center",fontSize:"16px"}},n.a.createElement("h2",null,"Error of reading or writing file on server"))}var v=()=>{const e=Object(a.useState)([]),t=Object(s.a)(e,2),o=t[0],l=t[1],i=Object(a.useState)(!1),r=Object(s.a)(i,2),d=r[0],p=r[1];Object(a.useEffect)(()=>{m()},[]);const m=()=>{fetch("/api",{mode:"no-cors",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer: token"}}).then(e=>{if(e.ok)return e.json();p(!0)}).then(e=>l(e))};return n.a.createElement("div",null,!d&&n.a.createElement(n.a.Fragment,null,n.a.createElement(h,{addTodo:e=>{const t={_id:Math.random(),text:e,completed:!1};fetch("/api",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer: token"},body:JSON.stringify(t)}).then(e=>{if(e.ok)return e.json();p(!0)}).then(e=>l([...o,e]))}}),n.a.createElement(b,{todos:o,deleteTodo:e=>{fetch("/api/todo/".concat(e),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer: token"},body:JSON.stringify({id:e})}).then(e=>{if(e.ok)return e.json();p(!0)}).then(()=>{m(),l(o)})},editTodo:(e,t)=>{const a={text:t,_id:e._id,completed:e.completed};fetch("/api/todo/".concat(e._id),{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer: token"},body:JSON.stringify(a)}).then(e=>{if(e.ok)return e.json();p(!0)}).then(e=>{l(o.map(t=>t._id===e._id?e:t))})},toggleTodo:e=>{l(o.map(t=>t._id===e?Object(c.a)(Object(c.a)({},t),{},{completed:!t.completed}):t))},toggleAllTodo:()=>{const e=o.every(e=>e.completed);l(o.map(t=>Object(c.a)(Object(c.a)({},t),{},{completed:!e})))},clearCompleted:()=>{l(o.filter(e=>!1===e.completed))}})),d&&n.a.createElement(T,null))};i.a.render(n.a.createElement(v,null),document.getElementById("root"))},6:function(e,t,o){e.exports=o(12)}},[[6,1,2]]]);
//# sourceMappingURL=main.cbc7fea9.chunk.js.map