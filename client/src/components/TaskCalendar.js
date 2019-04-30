import React, { Component } from 'react'

// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { withRouter } from 'react-router';

import {
    MDBContainer, MDBRow, MDBCol, MDBSpinner
} from 'mdbreact';

class TaskCalendar extends Component {

    componentDidMount() {
        console.log('component mounting')
        console.log(this.props);
        if (!localStorage.getItem('accessToken')) {
            this.props.history.push('/');
        }
    }

    render() {
        const user = this.props[0].currentUser;
        const eventsList = [];
        if (user !== null) {
            user.tasks.map((task, index) => 
                eventsList.push({id: index, title: task.title, start: new Date(task.start_date), end: new Date(task.end_date)})
            );
        }
        const isLoading = user === null;
        const localizer = BigCalendar.momentLocalizer(moment)
        return (
            <MDBContainer fluid style={{ marginTop: !isLoading ? document.getElementById("taskr-nav-bar").offsetHeight+10 : ""}}>
                {
                    isLoading 
                    ?
                        <MDBSpinner />
                    :
                        <MDBRow className="w-100 h-100">
                            <MDBCol style={{ height: "100vh" }}>
                                <BigCalendar
                                    className="h-100"
                                    localizer={localizer}
                                    events={eventsList}
                                    startAccessor="start"
                                    endAccessor="end"
                                />
                            </MDBCol>
                        </MDBRow>
                }
            </MDBContainer>
        )
    }
}

export default withRouter(TaskCalendar);