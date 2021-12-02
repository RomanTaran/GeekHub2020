import React from "react";
import styled from "styled-components";
import TextItem from "../TextItem";
import CorrectTextItem from "../CorrectTextItem";
import {useCustomSelector} from "../../customHooks";

const TextWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    font-size: 28px;
    line-height: 1.75;
    font-family: 'Cheltenham';
`;

export default function Text() {
    const {text, isLoaded, step} = useCustomSelector();
    if (!isLoaded) return null;
    const {words, isSuccess, wordPos, correctWord} = text[step];
    if (!isSuccess) {
        const textItems = words.map((item, index) => {
            const {word, isClicked} = item;
            return (
                <TextItem
                    key={index}
                    ind={index}
                    word={word}
                    clicked={isClicked}
                />
            )
        })
        return <TextWrapper>{textItems}</TextWrapper>
    }
    const textItems = words.map((item, index) => {
        const {word} = item;
        return (
            <CorrectTextItem
                key={index}
                correct={correctWord}
                ind={index}
                word={word}
                wordPos={wordPos}
            />
        )
    })
    return <TextWrapper>{textItems}</TextWrapper>
}
