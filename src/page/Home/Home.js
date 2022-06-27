import React from "react"
import { Button } from "antd"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"

const Home = props => {
    return (
        <>
            <Header />
            <PageContainer>
                <h1>Home</h1>
            </PageContainer>
        </>
    )
}

export default Home