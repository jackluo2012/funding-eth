import React, {Component} from 'react';
import {fundingFactoryInstance} from '../../eth/instance';
class CreatorFundingTab extends Component {


    async componentWillMount() {
        let creatorFundings = await fundingFactoryInstance.methods.getCreatorFundings().call();
        console.log(creatorFundings)
    }

    render() {
        return (
            <div>
                <p>x</p>
            </div>
        )
    }
};

export default CreatorFundingTab;