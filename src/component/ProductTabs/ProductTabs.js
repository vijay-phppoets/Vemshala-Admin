import React, { useState } from "react"
import { Tabs } from 'antd';
import { Redirect } from "react-router-dom"

const { TabPane } = Tabs;

const ProductTabs = props => {
    /* variable */
    const [redirect, serRedirect] = useState([false, ""])


    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}

            <Tabs activeKey={props.active}
                onChange={key => {
                    if (key === "basic_info") serRedirect([true, `/product/${props.id}/edit`])
                    if (key === "variants") serRedirect([true, `/product/${props.id}/edit/variants`])
                    if (key === "images") serRedirect([true, `/product/${props.id}/edit/images`])
                    if (key === "description") serRedirect([true, `/product/${props.id}/edit/description`])
                    if (key === "related_products") serRedirect([true, `/product/${props.id}/edit/related-products`])
                }}
            >
                <Tabs.TabPane key="basic_info" tab={"Basic Info"} />
                {props.type === "variant" &&
                    <Tabs.TabPane key="variants" tab={"Variants"} />
                }
                <Tabs.TabPane key="images" tab={"Images"} />
                <Tabs.TabPane key="description" tab={"Description"} />
                <Tabs.TabPane key="related_products" tab={"Related Products"} />
            </Tabs>
        </>
    )
}

export default ProductTabs