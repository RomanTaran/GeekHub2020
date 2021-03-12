import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'
import { Provider } from "react-redux";
import store from "./store";

render(<Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
