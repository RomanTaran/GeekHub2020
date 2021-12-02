import React from "react";
import styled from "styled-components";
import {useCustomSelector} from "../../customHooks";
import {errorDescription} from "../../constants";

const DescriptionWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 40px;
    font-size: 17px;
    color: #777;
    border-bottom: 1px solid grey;
`;

export default function SummaryDescription() {
    const {text, isLoaded, step} = useCustomSelector();
    if (!isLoaded) return null;
    const {isSuccess, tries} = text[step];
    if (!isSuccess) return null;
    return (
        <DescriptionWrapper>
            <p>Correct!</p>
            <p>{errorDescription[step]}</p>
            <p>That took you {tries} tries (along with 0 percent of other
                Times readers). You did better than 0 percent of readers.</p>
        </DescriptionWrapper>
    )
}
