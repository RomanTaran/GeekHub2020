import './App.css';
import Explanation from "./components/Explanation";
import CustomizedStepper from "./components/CustomizedStepper";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getTexts} from "./store/textsSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(getTexts());
    },[dispatch]);

    return (
        <>
            <Explanation/>
            <CustomizedStepper/>
        </>
    );
}

export default App;
