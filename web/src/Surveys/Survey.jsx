import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
// import StepperExample from './a';
import SurveysList from './SurveysList';

class Survey extends Component {
    state = {}
    render() {
        return (
            <div>
                <DashboardNav />
                <SurveysList />
            </div>
        );
    }
}

export default Survey;