import React, { Component } from 'react'
import { 
    MDBRow,
    MDBContainer,
    MDBCol,
    MDBIcon,
    MDBSpinner,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBBtn,
} from 'mdbreact';

import { withRouter } from 'react-router';
import TaskCreate from './TaskCreate';
import TaskPanel from './TaskPanel';

import {
    BASE_API_URL
} from '../utils/TaskrAPI'
import axios from 'axios';

const categoryColors = {
    '1': 'warning-color-dark',
    '2': 'success-color',
    '3': 'danger-color',
    '4': 'deep-purple accent-1'
}

const priorityColors = {
    '1': 'rgba-lime-light',
    '2': 'rgba-teal-light',
    '3': 'rgba-pink-light',
    '4': 'rgba-yellow-light',
    '5': 'rgba-orange-light',
    '6': 'rgba-red-light'
}

class Dashboard extends Component {

    state = {
        isOpen: false,
        categoryTitle: '',
        categoryId: '',
        categories: []
    }

    updateUser = () => {
        this.props.getUser();
    }

    toggleNewTask = (category) => {
        console.log(category);
        this.setState({isOpen: !this.state.isOpen, categoryId: category._id, categoryTitle: category.name});
    }

    closeNewTask = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    updateCategories = () => {
        axios(BASE_API_URL+'/api/category/all', { headers: { 'x-access-token': localStorage.getItem('accessToken') } })
        .then(response => {
            console.log('updating the categories from updateCategories after a delete action')
            this.setState({ 'categories': response.data.categories })
            console.log(response.data);
        })
        .catch(error => {
            console.log('error', error);
        })
    }

    componentDidMount() {
        if (!localStorage.getItem('accessToken')) {
            this.props.history.push('/');
        }
    }

    render() {
        const user = this.props[0].currentUser;
        const isLoading = user === null;
        return (
            <MDBContainer 
                fluid 
                id="dashboard" 
                style={{ 
                    marginTop: !isLoading ? document.getElementById("taskr-nav-bar").offsetHeight : ""
                }}
            >
                {
                    isLoading 
                    ? 
                        <MDBSpinner big />
                    :
                        <MDBRow className="h-100">
                            {
                                this.props[0].categories.map((category, index) =>
                                    <MDBCol md="6" lg="6"  xl="3" className={`px-0 py-0 ${index !== user.categories.length-1 ? "border-right border-dark" : ""}`} key={index}>
                                        <MDBCard className="px-0 border-0 h-100">
                                            <MDBCardHeader className={`${categoryColors[index+1]} rounded-0`}>
                                                <MDBRow className="px-2 d-flex justify-content-around align-middle">
                                                    <MDBCol size="10">
                                                        {category.name}
                                                        <hr className="mx-0 my-0" />
                                                        <small>Total: {category.tasks.length}</small>
                                                    </MDBCol>
                                                    <MDBCol size="2">
                                                        <MDBBtn size="sm" color="transparent" floating className="white-text" onClick={() => this.toggleNewTask(category)}>
                                                            <MDBIcon icon="plus" />
                                                        </MDBBtn>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardHeader>
                                            <MDBCardBody className="overflow-auto">
                                                {
                                                    category.tasks.map((task, index) =>
                                                        <TaskPanel 
                                                            task={task} 
                                                            color={priorityColors[task.priority]} 
                                                            key={index} 
                                                            updateCategories={this.updateCategories}
                                                        />
                                                    )
                                                }
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                )
                            }
                        </MDBRow>
                }
                <TaskCreate 
                    isOpen={this.state.isOpen} 
                    id={this.state.categoryId} 
                    title={this.state.categoryTitle} 
                    toggle={this.closeNewTask} 
                    updateUser={this.updateUser}
                />
            </MDBContainer>
        )
    }
}

export default withRouter(Dashboard);