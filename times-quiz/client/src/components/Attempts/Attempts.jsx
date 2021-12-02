import React from "react";
import styled from "styled-components";

import {useCustomSelector} from "../../customHooks";

const Tries = styled.span`
    margin-right: 10px;
    color: #ccc;
`;

export default function Attempts() {
    const {text, isLoaded, step} = useCustomSelector();
    if (!isLoaded) return null;
    const {tries, isSuccess} = text[step];
    if (isSuccess) return null;
    if (!tries) return null;
    const giveUp = tries > 2 ? 'Give up?' : null;
    return (
        <div>
            <Tries>{tries} tries</Tries>
            <span>{giveUp}</span>
        </div>
    )
}
