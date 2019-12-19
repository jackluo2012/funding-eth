import React, {Component} from 'react';
import {getFundingDetails} from '../../eth/interaction';
import CardList from "../common/CardList";
import CreateFundingForm from "./CreateFundingForm";

class CreatorFundingTab extends Component {
    //简写方式
    state = {
        creatorFundingsDetails: [],
    };

    async componentWillMount() {


        let creatorFundingsDetails = await getFundingDetails(2);

        this.setState({
            creatorFundingsDetails
        });
        console.table(creatorFundingsDetails);
    }

    render() {
        return (
            <div>
                <CardList details={this.state.creatorFundingsDetails}/>
                <CreateFundingForm/>
            </div>
        )
    }
};

export default CreatorFundingTab;