import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {nextStep, prevStep} from "../../store/activeStepSlice";
import {useCustomSelector} from "../../customHooks";

const StepperNavButtons = styled.div`
display:flex;
justify-content: center;
`;

const NavButton = styled.button`
display: inline-block;
font-size: 22px;
color: #053e69;
background-color: #eaf2f9;
padding: 16px 22px;
border-radius: 3px;
border-width: 0;
cursor: pointer;
margin-top: 10px;
transition: all .35s ease-out;
transition-property: padding,background-color;
margin: 5px;
}`;

const PrevButton = styled(NavButton)`
  display: ${props => props.active <= 0 ? "none" : "block"} 
`;

const NextButton = styled(NavButton)`
  display: ${props => props.active > props.length-2 ? "none" : "block"}
`;


export default function NavButtons() {
    const {step, text} = useCustomSelector();
    const dispatch = useDispatch();

    const handlePrevClick = () => {
        dispatch(prevStep());
    }

    const handleNextClick = () => {
        dispatch(nextStep());
    }
    return (
        <StepperNavButtons>
            <PrevButton
                active={step}
                onClick={handlePrevClick}
            >
                Previous
            </PrevButton>
            <NextButton
                active={step}
                length={text.length}
                onClick={handleNextClick}
            >
                Next
            </NextButton>
        </StepperNavButtons>
    )
}
