import React, { Component } from 'react'

import {
    MDBInput,
    MDBIcon,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBBtn
} from 'mdbreact';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { BASE_API_URL } from '../utils/TaskrAPI';
import axios from 'axios';

class TaskEdit extends Component {

    state = {
        formData: {
            'title': '',
            'tags': [],
            'description': '',
            'priority': '',
            'startDate': new Date(),
            'endDate': new Date(),
            'confirm': ''
        },
        formErrors: {
            'title': '',
            'category': '',
            'description': '',
            'priority': '',
            'startDate': '',
            'endDate': '',
        },
        titleValid: false,
        descriptionValid: false,
        priorityValid: false,
        startDateValid: false,
        endDateValid: false,
        formValid: false,
        showErrors: false
    }

    handleTaskCreation = () => {
        const data = {
            title: this.state.formData.title,
            category: this.state.formData.category,
            description: this.state.formData.description,
            priority: this.state.formData.priority,
            start_date: this.state.formData.startDate,
            end_date: this.state.formData.endDate,
            category_id: this.props.id,
        }
        axios.post(`${BASE_API_URL}/api/task/create`, data, { headers: {'x-access-token': localStorage.getItem('accessToken')} })
        .then(response => {
            console.log(response.data);
            this.props.updateUser();
            this.toggleModal();
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.formValid) {
            this.handleTaskCreation();
        } else {
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
        console.log(name + ": " + value);
        console.log(typeof value)
        formData[name] = value;
        this.setState({
            formData: formData
        }, () => {
            this.validateField(name, value);
        });
    }

    validateField = (fieldName, value) => {
        let validationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let descriptionValid = this.state.descriptionValid;
        let priorityValid = this.state.priorityValid;

        switch (fieldName) {
            case 'title':
                titleValid = value.length > 2;
                validationErrors.title = titleValid ? '' : 'Title must be more than 2 characters'
                break;
            case 'description':
                descriptionValid = value.length > 10;
                validationErrors.description = descriptionValid ? '' : 'Description must be more than 10 characters'
                break;
            case 'priority':
                priorityValid = parseInt(value) > 0 && parseInt(value) < 7;
                validationErrors.priority = priorityValid ? '' : 'Invalid priority'
                break;
            default:
                break;
        }
        this.setState({
            formErrors: validationErrors,
            titleValid: titleValid,
            descriptionValid: descriptionValid,
            priorityValid: priorityValid,
        }, this.validateForm)
    }

    validateForm = () => {
        if (this.state.titleValid && 
                this.state.descriptionValid &&
                this.state.startDateValid && 
                this.state.endDateValid && 
                this.state.priorityValid) {
                    console.log('the form is valid')
                }
        this.setState({
            formValid: 
                this.state.titleValid && 
                this.state.descriptionValid &&
                this.state.startDateValid && 
                this.state.endDateValid && 
                this.state.priorityValid
            });
    }

    toggleModal = () => {
        this.props.toggle();
    }

    handleStartDate = (date) => {
        console.log('Start Date: ', date);
        console.log(typeof date);
        let formData = {...this.state.formData}
        formData['startDate'] = date
        this.setState({
            formData: formData
        }, () => {
            this.validateStartDate(date);
        });
    }

    validateStartDate = (date) => {
        let validationErrors = this.state.formErrors
        if (date > Date.now()) {
            this.setState({startDateValid: true}, this.validateForm);
        } else {
            validationErrors.startDate = 'The start date must be in the future'
            this.setState({formErrors: validationErrors, startDateValid: false})
        }
    }

    handleEndDate = (date) => {
        console.log('End Date: ', date);
        console.log(typeof date);
        let formData = {...this.state.formData}
        formData['endDate'] = date
        this.setState({
            formData: formData
        }, () => {
            this.validateEndDate(date);
        });
    }

    validateEndDate = (date) => {
        let validationErrors = this.state.formErrors
        if (date > this.state.formData.startDate) {
            this.setState({endDateValid: true}, this.validateForm);
        } else {
            validationErrors.endDate = 'The end date must after the start date'
            this.setState({formErrors: validationErrors, endDateValid: false})
        }
    }

    render() {
        return (
            <MDBModal 
                backdrop={true}
                isOpen={this.props.isOpen}
                toggle={this.toggleModal}
                centered
                rounded
                className="modal-notify modal-info"
            >
                <MDBModalHeader className="white-text" tag="p" toggle={this.toggleModal}>
                    <MDBIcon icon="tasks" /> New {this.props.title} Task:
                </MDBModalHeader>
                <MDBModalBody className="p-0">
                    <form className="d-flex flex-column justify-content-around p-2" onSubmit={this.handleSubmit}>
                        {(this.state.showErrors && !this.state.titleValid) && <p className="text-danger">{this.state.formErrors.title}</p>}
                        <MDBInput label="Title" name="title" value={this.state.formData.title} onChange={this.handleInputChange} />
                        <h6 className="text-muted m-0">From</h6>
                        {(this.state.showErrors && !this.state.startDateValid) && <p className="text-danger">{this.state.formErrors.startDate}</p>}
                        <div className="md-form">
                            <DatePicker
                                selected={this.state.formData.startDate}
                                onChange={this.handleStartDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="Start"
                                name="startDate"
                            />
                        </div>
                        <h6 className="text-muted m-0">to</h6>
                        {(this.state.showErrors && !this.state.endDateValid) && <p className="text-danger">{this.state.formErrors.endDate}</p>}
                        <div className="md-form">
                            <DatePicker
                                selected={this.state.formData.endDate}
                                onChange={this.handleEndDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="End"
                                name="endDate"
                            />
                        </div>
                        {(this.state.showErrors && !this.state.priorityValid) && <p className="text-danger">{this.state.formErrors.priority}</p>}
                        <MDBInput 
                            type="number" 
                            label="Priority"
                            name="priority" 
                            value={this.state.formData.priority} 
                            onChange={this.handleInputChange}
                        />
                        {(this.state.showErrors && !this.state.descriptionValid) && <p className="text-danger">{this.state.formErrors.description}</p>}
                        <MDBInput
                            type="textarea" 
                            label="Description" 
                            rows="3" 
                            name="description" 
                            value={this.state.formData.description} 
                            onChange={this.handleInputChange}
                        />
                        <MDBBtn className="success-color" size="md" type="submit">Create</MDBBtn>
                    </form>
                </MDBModalBody>
            </MDBModal>
        )
    }
}

export default TaskEdit;