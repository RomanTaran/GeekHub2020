import React from 'react';
import Attempts from "../Attempts";
import StepperNav from "../StepperNav";
import NavButtons from "../NavButtons";
import TextContainer from "../TextContainer";
import StepsCount from "../StepsCount";

export default function CustomizedStepper() {
    return (
        <>
            <StepperNav/>
            <StepsCount/>
            <TextContainer/>
            <Attempts/>
            <NavButtons/>
        </>
    );
}
