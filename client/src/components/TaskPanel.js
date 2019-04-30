import React, { Component } from 'react'

import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardFooter,
    MDBCardText,
    MDBBtn
} from 'mdbreact';

import axios from 'axios';
import {
    BASE_API_URL
} from '../utils/TaskrAPI'

const timeBetween = (start, end) => {
    var d = 0;
    var hBetween = (end.getTime() - start.getTime()) / 3600000;
    if (hBetween < 24) {
        return `${hBetween} hours`;
    } else {
        while (hBetween >= 24) {
            d++;
            hBetween -= 24;
        }
        return `${d} day(s), ${hBetween} hours`;
    }
}

class TaskPanel extends Component {

    state = {
        task: null,
        isOpen: false
    }

    handleTaskDelete = () => {
        axios.delete(BASE_API_URL+`/api/task/delete/${this.state.task._id}`, {headers: { 'x-access-token': localStorage.getItem('accessToken') }})
        .then(response => {
            this.props.updateCategories();
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleTaskEdit = () => {
        console.log('edit working')
        console.log(this.state.task)
        // send the task information to the modal
        // handle any edits that are made
        // send the put request to the server
    }

    componentWillMount() {
        this.setState({task: this.props.task})
    }

    render() {
        const task = this.state.task;
        const start = new Date(task.start_date);
        const end = new Date(task.end_date);
        return (
            <MDBCard style={{ marginTop: "1rem" }}>
                <MDBCardHeader color={this.props.color} className="black-text">
                    <div className="d-flex flex-row justify-content-between">
                        <h6 className="black-text">{task.title}</h6>
                        <div className="d-flex flex-column justify-content-between">
                            <small className="black-text">Priority: {task.priority}</small>
                            <small className="black-text">{timeBetween(start, end)}</small>
                        </div>
                    </div>
                </MDBCardHeader>
                <MDBCardBody className={this.props.color}>
                    <MDBCardText className="black-text">{task.description}</MDBCardText>
                </MDBCardBody>
                <MDBCardFooter color={this.props.color} className="d-flex justify-content-center">
                    <MDBBtn color="primary" size="sm" onClick={this.handleTaskEdit}>Edit</MDBBtn>
                    <MDBBtn color="danger" size="sm" onClick={this.handleTaskDelete}>Delete</MDBBtn>
                </MDBCardFooter>
            </MDBCard>
        )
    }
}

export default TaskPanel;