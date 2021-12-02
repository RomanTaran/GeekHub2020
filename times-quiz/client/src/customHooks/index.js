import {useSelector} from "react-redux";

export function useCustomSelector() {
    const {text, isLoaded} = useSelector(state => state.texts);
    const {step} = useSelector(state => state.steps);
    return {text, step, isLoaded};
}
