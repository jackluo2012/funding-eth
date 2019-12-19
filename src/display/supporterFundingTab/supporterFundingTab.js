import React, {Component} from 'react';
import {getFundingDetails} from '../../eth/interaction';
import CardList from "../common/CardList";

class SupporterFundingTab extends Component {
    //简写方式
    state = {
        supporterFundingsDetails: [],
    };

    async componentWillMount() {


        let supporterFundingsDetails = await getFundingDetails(3);
        console.table('SupporterFundingTab',supporterFundingsDetails)
        this.setState({
            supporterFundingsDetails
        });
    }

    render() {
        return (
            <CardList details={this.state.supporterFundingsDetails}/>
        )
    }
};

export default SupporterFundingTab;