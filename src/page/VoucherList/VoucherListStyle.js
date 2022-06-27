import styled, { css } from 'styled-components'

export const Indicator = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: grey;

    ${props => props.green && css`
        background-color: #03c503;
    `}

    ${props => props.red && css`
        background-color: red;
    `}
`