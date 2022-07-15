import React, { useState, useEffect } from "react"
import { Button, Tree, Skeleton, Space, Popconfirm, message } from "antd"
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

/* custom component */
import Header from "../../component/Header/Header"
import { PageContainer } from "../../component/Xcomponent"

/* action */
import { getCategoryTree, getCategoryTreeReset } from "../../action/getCategoryTreeAction"
import { deleteCategory, deleteCategoryReset } from "../../action/deleteCategoryAction"

/* others */
import cnf from "../../config"

const CategoryList = props => {
    /* variables */
    const {
        getCategoryTree, getCategoryTreeReset, getCategoryTreeState,
        deleteCategory, deleteCategoryReset, deleteCategoryState
    } = props
    const [redirect, setRedirect] = useState([false, ""])
    const [refresh, setRefresh] = useState(0)

    /* callbacks */
    useEffect(() => {
        getCategoryTree()
    }, [refresh])

    useEffect(() => {
        if (deleteCategoryState.apiState === "success") {
            message.success(deleteCategoryState.message);
            deleteCategoryReset()
            setRefresh(refresh + 1)
        }

        if (deleteCategoryState.apiState === "error") {
            message.error(deleteCategoryState.message);
            deleteCategoryReset()
        }
    }, [deleteCategoryState])

    /* functions */
    const getTreeData = (tree) => {
        let finalArray = []
        tree.map(node => {
            if (node.children.length > 0) {
                finalArray.push(
                    {
                        title: (<Space style={{margin:'1em'}}>
                            <img src={`${cnf.s3_base_url}${node.image}`} alt="" style={{ width: 40 }} />
                            <span>{node.name}</span>
                            <Link to={`/category/${node.id}/edit`}><Button size="small" icon={<EditOutlined />} /></Link>
                            <Popconfirm
                                title="Are you sure to delete this category? !!Note: Deleteting this category, all the children will be deleted also!!"
                                onConfirm={() => deleteCategory({ category_id: node.id })}
                                okText="Delete"
                                cancelText="Cancel"
                                okType="danger"
                            >
                                <Button size="small" icon={<DeleteOutlined />} loading={deleteCategoryState.apiState === "loading"} />
                            </Popconfirm>
                        </Space>),
                        key: node.id,
                        children: getTreeData(node.children)
                    }
                )
            } else {
                finalArray.push(
                    {
                        title: (<Space style={{margin:'1em'}}>
                            <img src={`${cnf.s3_base_url}${node.image}`} alt="" style={{ width: 40 }} />
                            <span>{node.name}</span>
                            <Link to={`/category/${node.id}/edit`}><Button size="small" icon={<EditOutlined />} /></Link>
                            <Popconfirm
                                title="Are you sure to delete this category? !!Note: Deleteting this category, all the children will be deleted also!!"
                                onConfirm={() => deleteCategory({ category_id: node.id })}
                                okText="Delete"
                                cancelText="Cancel"
                                okType="danger"
                            >
                                <Button size="small" icon={<DeleteOutlined />} loading={deleteCategoryState.apiState === "loading"} />
                            </Popconfirm>
                        </Space>),
                        key: node.id,
                    }
                )
            }

        })
        return finalArray
    }



    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}


            <Header
                title="Category List"
                actionBtn={<Link to='/category/add'><Button >New</Button></Link>}
            />
            <PageContainer>
                {getCategoryTreeState.apiState === "loading" &&
                    <Skeleton active />}

                {getCategoryTreeState.apiState === "error" &&
                    <h1>Something is not right</h1>}

                {getCategoryTreeState.apiState === "success" &&
                    <>
                        <div style={{ borderRadius:'10px', border: "solid 1px #ccc",backgroundColor:'white',height:'100%',width: "100%", padding: 10 }} >
                            <Tree
                                treeData={getTreeData(getCategoryTreeState.tree)}
                                showLine={{ showLeafIcon: false }}
                                showIcon={false}
                                selectable={false}
                            />
                        </div>
                    </>
                }
            </PageContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getCategoryTreeState: state.getCategoryTree,
    deleteCategoryState: state.deleteCategory,
})

const mapDispatchToProps = (dispatch) => ({
    getCategoryTree: (params) => dispatch(getCategoryTree(params)),
    getCategoryTreeReset: () => dispatch(getCategoryTreeReset()),
    deleteCategory: (params) => dispatch(deleteCategory(params)),
    deleteCategoryReset: () => dispatch(deleteCategoryReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)