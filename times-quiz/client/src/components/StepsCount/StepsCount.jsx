import React from "react";
import {useCustomSelector} from "../../customHooks";

export default function StepsCount(){
    const {step} = useCustomSelector();
    return <p>{step+1} of 15</p>
}
