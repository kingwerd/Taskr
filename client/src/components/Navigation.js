import React, { Component } from 'react'
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavLink,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon
} from 'mdbreact';

import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';

class Navigation extends Component {

    state = {
        isOpen: false
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        this.props.getUser();
        this.props.history.push('/');
    }

    render() {
        console.log(this.props.currentUser)
        const isUser = this.props.currentUser !== null;

        return (
            <MDBNavbar dark expand="md" fixed="top" color="indigo darken-4" id="taskr-nav-bar">
                <Link className="navbar-brand" to="/">
                    Taskr
                </Link>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="taskr-navigation" isOpen={this.state.isOpen} navbar>
                    {
                        isUser && 
                        <MDBNavbarNav left>
                            <MDBNavItem>
                                <MDBNavLink to="/dashboard" >Dashboard</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/calendar" >Calendar</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    }
                    {
                        isUser ?
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem onClick={this.handleLogout}>
                                            Logout
                                        </MDBDropdownItem>
                                        <MDBDropdownItem>
                                            <MDBNavLink to="/account" className="black-text">Account</MDBNavLink>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        :
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink to="/login">Login</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/register">Register</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    }
                </MDBCollapse>
            </MDBNavbar>
        )
    }
}
export default withRouter(Navigation);