import React, { Component } from 'react'
import { withRouter } from 'react-router';
import {
    BASE_API_URL
} from '../utils/TaskrAPI'

import {
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCol,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBBtn,
    MDBView,
    MDBMask
} from 'mdbreact';

import axios from 'axios';

class Login extends Component {

    state = {
        formData: {
            'username': '',
            'password': ''
        },
        formErrors: {
            'username': '',
            'password': ''
        },
        usernameValid: false,
        passwordValid: false,
        formValid: false,
        showErrors: false
    }

    handleLogin = () => {
        const data = {
            username: this.state.formData.username,
            password: this.state.formData.password
        }
        axios.post(`${BASE_API_URL}/api/auth/signin`, data)
        .then(response => {
            localStorage.setItem('accessToken', response.data.token);
            this.props.getUser();
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            this.props.setPrevious('login');
            this.props.history.push('/dashboard')
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitting')
        if (this.state.formValid) {
            this.handleLogin();
        } else {
            console.log('showing errors')
            this.setState({showErrors: true})
        }
    }

    handleInputChange = (e) => {
        if (this.state.showErrors) {
            this.setState({showErrors: false});
        }
        e.preventDefault();
        let formData = {...this.state.formData}
        const name = e.target.name;
        const value = e.target.value;
        formData[name] = value;
        this.setState({
            formData: formData
        }, () => {
            this.validateField(name, value);
        });
    }

    validateField = (fieldName, value) => {
        let validationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'username':
                usernameValid = value.length > 3;
                validationErrors.username = usernameValid ? '' : 'Username is too short'
                break;
            case 'password':
                passwordValid = value.length > 8;
                validationErrors.password = passwordValid ? '' : 'Password is too short'
                break;
            default:
                break;
        }
        this.setState({
            formErrors: validationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid,
        }, this.validateForm)
    }

    validateForm = () => {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    render() {
        console.log('showErrors', this.state.showErrors)
        return (
            <div id="landing">
                <MDBView>
                    <MDBMask
                        className="d-flex justify-content-center align-items-center"
                        overlay="gradient"
                    >
                        <MDBContainer className="h-100 w-100">
                            <MDBRow className="w-100 h-100 d-flex justify-content-center align-items-center">
                                <MDBCol md="10" lg="6" xl="5" sm="12" className="mt-5 mx-auto">
                                    <MDBCard>
                                        <MDBCardBody>
                                            <div className="form-header peach-gradient">
                                                <h3><MDBIcon icon="user" className="mt-2 mb-2 text-white" /> Log in:</h3>
                                            </div>
                                            <form onSubmit={this.handleSubmit}>
                                                {
                                                    this.state.showErrors && 
                                                    <p className="text-danger">{this.state.formErrors.username}</p>
                                                }
                                                <MDBInput
                                                    type="text"
                                                    label="Your username" 
                                                    icon="user"
                                                    name="username"
                                                    value={this.state.formData.username}
                                                    onChange={this.handleInputChange}
                                                />
                                                {this.state.showErrors && <span className="text-danger">{this.state.formErrors.password}</span>}
                                                <MDBInput 
                                                    type="password"
                                                    label="Your password"
                                                    icon="lock"
                                                    name="password"
                                                    value={this.state.formData.password}
                                                    onChange={this.handleInputChange}
                                                />
                                                <div className="text-center mt-3 black-text">
                                                    <MDBBtn className="peach-gradient" size="lg" type="submit">Login</MDBBtn>
                                                    <hr />
                                                </div>
                                            </form>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBMask>
                </MDBView>
            </div>
        )
    }
}

export default withRouter(Login);