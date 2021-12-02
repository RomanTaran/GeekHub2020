import React from "react";
import styled from "styled-components";
import StepperItem from "../StepperItem";
import {useCustomSelector} from "../../customHooks";

const StepperNavWrap = styled.div`
display: flex;
`;

export default function StepperNav() {
    const {text, isLoaded} = useCustomSelector();
    if(!isLoaded) return null;
    const stItem = text.map((item, ind)=>
        <StepperItem key={ind} success={item.isSuccess} index={ind} />
    );
    return (
        <StepperNavWrap>
            {stItem}
        </StepperNavWrap>)
}
