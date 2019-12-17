import React from 'react';

import web3 from './utils/initWeb3';

import TabCenter from './display/tabcenter';
import {fundingFactoryInstance} from './eth/instance';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            accounts: [],
            currentAccount:'',
        }
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts();
        console.log(accounts);
        let platfromManager = await fundingFactoryInstance.methods.platformManager().call();
        console.log(platfromManager);
        this.setState({
            currentAccount:accounts[0],
        })
    }

    render() {
        return (
            <div className="App">
                <h1>智橙互动众筹</h1>
                <img src="https://api.gushi.ci/all.svg" />
                <p>当前账户: {this.state.currentAccount}</p>
                <TabCenter />
            </div>
        );
    }


}

export default App;
