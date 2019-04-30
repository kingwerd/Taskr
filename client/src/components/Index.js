import React, { Component } from 'react'

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBMask,
    MDBIcon,
    MDBView,
} from 'mdbreact';

import {
    Link, withRouter
} from 'react-router-dom';

class Index extends Component {

    state = {
        mockTasks: [
            'Play around with some Taskr features',
            'Learn what Taskr can do for me',
            'Recommend this to everyone I know'
        ],
        taskInput: ''
    }

    createTask = () => {
        let mockTasks = [...this.state.mockTasks];
        mockTasks.push(this.state.taskInput);
        this.setState({mockTasks: mockTasks, taskInput: ''});
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({taskInput: e.target.value})
    }

    componentDidMount() {
        if (localStorage.getItem('accessToken')) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        const tasks = this.state.mockTasks.map((task, index) =>
            <div className="form-check mb-5" key={index}>
                <input type="checkbox" className="form-check-input" id={`task${index}`} onChange={this.completeTask} />
                <label className="form-check-label white-text" htmlFor={`task${index}`}>{task}</label>
            </div>
        )
        return (
            <div id="landing">
                <MDBView>
                    <MDBMask
                        className="d-flex justify-content-center align-items-center"
                        overlay="gradient"
                    >
                        <MDBContainer className="d-flex justify-content-center align-items-center">
                            <MDBRow className="flex-center pt-5 mt-3">
                                <MDBCol md="6" className="text-center text-md-left mb-5">
                                    <div className="white-text">
                                        <h1 className="h1-responsive font-weight-bold wow fadeInLeft" data-wow-delay="0.3s" >Sign up right now! </h1>
                                        <hr className="hr-light wow fadeInLeft" data-wow-delay="0.3s" />
                                        <h6 className="wow fadeInLeft" data-wow-delay="0.3s" >
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga
                                            nesciunt dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea
                                            dolor molestiae, quisquam iste, maiores. Nulla.
                                        </h6>
                                        <br />
                                        <Link color="white" className="btn btn-rounded" to="/register">Register</Link>
                                    </div>
                                </MDBCol>
                                <MDBCol md="6" className="">
                                    <MDBCard>
                                        <MDBCardBody className="d-flex flex-column justify-content-between">
                                            <div className="text-center">
                                                <h3 className="white-text"><MDBIcon icon="user white-text" /> Cool Iteractivity</h3>
                                                <hr className="hr-light"></hr>
                                            </div>
                                            <div className="md-form input-group mb-3">
                                                <input type="text" className="form-control" value={this.state.taskInput} onChange={this.handleInputChange} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-md btn-success m-0 px-3" type="button" id="add-task" onClick={this.createTask}><MDBIcon icon="plus-circle" /> Task</button>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column">
                                                {tasks}
                                            </div>
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

export default withRouter(Index);