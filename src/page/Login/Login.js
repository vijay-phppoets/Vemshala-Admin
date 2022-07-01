import React, { useState, useEffect } from "react"
import { Button, Form, Input } from "antd"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

/* custom component */
import { LoginContainer } from "../../component/Xcomponent"

/* actions */
import { login, loginReset } from "../../action/loginAction"

const Login = props => {
    /* variables */
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { login, loginReset, loginState } = props
    const [redirect, setRedirect] = useState([false, ''])

    /* callbacks */
    useEffect(() => {
        return (() => loginReset())
    }, [])

    useEffect(() => {
        if (loginState.apiState === "success") {
            localStorage.setItem("PikyUserToken", loginState.data.token)
            localStorage.setItem("PikyUser", JSON.stringify(loginState.data.user))
            setRedirect([true, '/'])
        }
    }, [loginState])

    /* function */
    const handleSubmit = () => {
        login(formData)
    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />}


            <LoginContainer>
                <div style={{ padding: 16, border: "solid 1px #ccc", background: "#fff", borderRadius: '10px', minWidth: 350 }} >
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, ['email']: e.target.value })} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input.Password name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, ['password']: e.target.value })} />
                        </Form.Item>
                        <Button htmlType="submit" type="primary" block >LOGIN</Button>
                    </Form>
                </div>
            </LoginContainer>
        </>
    )
}

const mapStateToProps = (state) => ({ loginState: state.login })

const mapDispatchToProps = (dispatch) => ({
    login: (params) => dispatch(login(params)),
    loginReset: () => dispatch(loginReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)