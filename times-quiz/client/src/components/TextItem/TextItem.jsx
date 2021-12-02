import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setClicked} from "../../store/textsSlice";
import {useCustomSelector} from "../../customHooks";

const TextSpan = styled.div`
    margin-right: 4px;
    cursor: pointer;
    :hover {
        color: ${props => props.clicked ? 'grey' : 'red'};
    };
    color: ${props => props.clicked ? 'grey' : 'initial'};
`;

export default function TextItem(props) {
    const {ind, clicked} = props;
    const dispatch = useDispatch();
    const {step,text} = useCustomSelector();
    const onWordClick = () => {
        dispatch(setClicked({step, ind, text}));
    }
    return <TextSpan clicked={clicked} onClick={onWordClick}>{props.word}</TextSpan>
}
