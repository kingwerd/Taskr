import React, { Component } from 'react'

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBProgress,
    MDBIcon,
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem
} from 'mdbreact';

class TaskList extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        this.setState({categories: this.props.user.categories})
    }

    render() {
        return (
            <MDBRow className="h-100">
                {
                    this.state.categories.map((category, index) =>
                        <MDBCol className={`px-0 py-0 ${index !== this.state.categories.length-1 ? "border-right border-dark" : ""}`} key={index}>
                            <MDBCard className="px-0 border-0 h-100">
                                <MDBCardHeader className="primary-color d-flex flex-row justify-content-between rounded-0">
                                    <div>
                                        {category.name}
                                        <hr className="mx-0 my-0" />
                                        <small>{category.tasks.length} Total</small>
                                    </div>
                                    <div>
                                        <MDBBtn size="sm" floating color="transparent" className="white-text">
                                            <MDBIcon icon="ellipsis-v" className="w-100" />
                                        </MDBBtn>
                                    </div>
                                </MDBCardHeader>
                                <MDBCardBody className="grey lighten-2">
                                    <MDBListGroup>
                                        {
                                            category.tasks.map(task =>
                                                <MDBListGroupItem>
                                                    {task.title}
                                                </MDBListGroupItem>
                                            )
                                        }
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )
                }
            </MDBRow>
        )
    }
}

export default TaskList;