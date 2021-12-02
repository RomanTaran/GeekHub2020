import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setStep} from "../../store/activeStepSlice";
import {useCustomSelector} from "../../customHooks";

const StepperNavStep = styled.span`
    display: inline-block;
    flex-grow: 1;
    height: 10px;
    background-color: ${props => {
    if (props.success) {
        return '#46844a'
    } else if (props.ind === props.step) {
        return '#4d4b4b';
    }
    return '#ccc'
}};
    opacity: ${props => props.success && props.ind === props.step ? 1 : 0.5};
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 2px;
    margin-right: 2px;
    cursor: pointer;
`;

export default function StepperItem({index, success}) {
    const {step} = useCustomSelector();
    const dispatch = useDispatch();
    const handleSetStep = () => {
        dispatch(setStep(index));
    }
    return <StepperNavStep success={success} step={step} ind={index} onClick={handleSetStep}/>
}
