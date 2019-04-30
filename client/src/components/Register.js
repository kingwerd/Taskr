import React, { Component } from 'react'

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
import {
    BASE_API_URL
} from '../utils/TaskrAPI';

import { withRouter } from 'react-router';

class Register extends Component {

    state = {
        formData: {
            'firstName': '',
            'lastName': '',
            'email': '',
            'username': '',
            'password': '',
            'confirm': ''
        },
        formErrors: {
            'firstName': '',
            'lastName': '',
            'email': '',
            'username': '',
            'password': '',
            'confirm': ''
        },
        firstNameValid: false,
        lastNameValid: false,
        emailValid: false,
        usernameValid: false,
        passwordValid: false,
        confirmValid: false,
        formValid: false,
        showErrors: true
    }

    handleRegistration = () => {
        const data = {
            firstName: this.state.formData.firstName,
            lastName: this.state.formData.lastName,
            email: this.state.formData.email,
            username: this.state.formData.username,
            password: this.state.formData.password
        }
        axios.post(`${BASE_API_URL}/api/auth/signup`, data)
        .then(response => {
            localStorage.setItem('accessToken', response.data.token);
            this.props.getUser();
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            this.props.setPrevious('register');
            this.props.history.push('/dashboard');
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitting')
        if (this.state.formValid) {
            this.handleRegistration();
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
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let emailValid = this.state.emailValid;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        let confirmValid = this.state.confirmValid;

        switch (fieldName) {
            case 'firstName':
                firstNameValid = value.length > 2;
                validationErrors.firstName = firstNameValid ? '' : 'First name must be more than 2 characters'
                break;
            case 'lastName':
                lastNameValid = value.length > 2;
                validationErrors.lastName = lastNameValid ? '' : 'First name must be more than 2 characters'
                break;
            case 'email':
                emailValid = value.length > 3;
                validationErrors.email = emailValid ? '' : 'Invalid email'
                break;
            case 'username':
                usernameValid = value.length > 3;
                validationErrors.username = usernameValid ? '' : 'Username must be more than 3 characters'
                break;
            case 'password':
                passwordValid = value.length > 8;
                validationErrors.password = passwordValid ? '' : 'Username is too short'
                break;
            case 'confirm':
                confirmValid = value === this.state.formData.password;
                validationErrors.confirm = confirmValid ? '' : 'Passwords do not match'
                break;
            default:
                break;
        }
        this.setState({
            formErrors: validationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            emailValid: emailValid,
            usernameValid: usernameValid,
            passwordValid: passwordValid,
            confirmValid: confirmValid
        }, this.validateForm)
    }

    validateForm = () => {
        this.setState({
            formValid: 
                this.state.firstNameValid && 
                this.state.lastNameValid &&
                this.state.emailValid && 
                this.state.usernameValid && 
                this.state.passwordValid &&
                this.state.confirmValid
            });
    }

    render() {
        return (
            <div id="landing">
                <MDBView>
                    <MDBMask
                        className="d-flex justify-content-center align-items-center"
                        overlay="gradient"
                    >
                        <MDBContainer id="register">
                            <MDBRow className="w-100 h-100 d-flex justify-content-center align-items-center">
                                <MDBCol md="10" lg="6" xl="5" sm="12" className="mt-5 mx-auto">
                                    <MDBCard>
                                        <MDBCardBody>
                                            <div className="form-header peach-gradient">
                                                <h3><MDBIcon icon="user" className="mt-2 mb-2 text-white" /> Sign Up:</h3>
                                            </div>
                                            <form onSubmit={this.handleSubmit}>
                                                {
                                                    (this.state.showErrors && !this.state.firstNameValid) && 
                                                    <p className="text-danger">{this.state.formErrors.firstName}</p>
                                                }
                                                <MDBInput
                                                    type="text"
                                                    label="Your first name"
                                                    icon="address-card"
                                                    name="firstName"
                                                    value={this.state.formData.firstName}
                                                    onChange={this.handleInputChange}
                                                />
                                                {
                                                    (this.state.showErrors && !this.state.lastNameValid) && 
                                                    <p className="text-danger">{this.state.formErrors.lastName}</p>
                                                }
                                                <MDBInput
                                                    type="text"
                                                    label="Your last name"
                                                    icon="address-card"
                                                    name="lastName"
                                                    value={this.state.lastName}
                                                    onChange={this.handleInputChange}
                                                />
                                                {
                                                    (this.state.showErrors && !this.state.emailValid) && 
                                                    <p className="text-danger">{this.state.formErrors.email}</p>
                                                }
                                                <MDBInput
                                                    type="email"
                                                    label="Your email"
                                                    icon="envelope"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.handleInputChange}
                                                />
                                                {
                                                    (this.state.showErrors && !this.state.usernameValid) && 
                                                    <p className="text-danger">{this.state.formErrors.username}</p>
                                                }
                                                <MDBInput 
                                                    type="text" 
                                                    label="Your username" 
                                                    icon="user"
                                                    name="username"
                                                    value={this.state.username}
                                                    onChange={this.handleInputChange}
                                                />
                                                {
                                                    (this.state.showErrors && !this.state.passwordValid) && 
                                                    <p className="text-danger">{this.state.formErrors.password}</p>
                                                }
                                                <MDBInput 
                                                    type="password" 
                                                    label="Your password" 
                                                    icon="lock"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.handleInputChange}
                                                />
                                                {
                                                    (this.state.showErrors && !this.state.confirmValid) && 
                                                    <p className="text-danger">{this.state.formErrors.confirm}</p>
                                                }
                                                <MDBInput 
                                                    type="password" 
                                                    label="Confirm your password" 
                                                    icon="key"
                                                    name="confirm"
                                                    value={this.state.confirm}
                                                    onChange={this.handleInputChange}
                                                />
                                                <div className="text-center mt-3 black-text">
                                                    <MDBBtn className="peach-gradient" size="lg" type="submit">Signup</MDBBtn>
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
export default withRouter(Register);