import React from "react";
import styled from "styled-components";

const TextSpan = styled.div`
    margin-right: 4px;
`;

const MarkedTextSpan=styled(TextSpan)`
  color: ${props => props.correct?'green':'red'};
  margin-right: ${props => props.incorrect?'0':'4px'};
  text-decoration: ${props => props.incorrect?'line-through':'none'};
`

export default function CorrectTextItem(props) {
    if (props.wordPos !== props.ind) {
        return <TextSpan>{props.word}</TextSpan>;
    }
    return (
        <>
            <MarkedTextSpan incorrect>{props.word}</MarkedTextSpan>
            <MarkedTextSpan correct>{props.correct}</MarkedTextSpan>
        </>
    );
}
