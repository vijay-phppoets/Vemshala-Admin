import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
`

export const PageContainer = styled.div`
    background: #f3f3f3;
    padding: 8px 16px;
    min-height: calc(100vh - 50px);

    ${({ list }) => list && `
        padding: 0;
    `}
`