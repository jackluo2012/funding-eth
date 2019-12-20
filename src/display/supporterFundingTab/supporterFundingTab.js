import React, {Component} from 'react';
import {approveRequest, getFundingDetails, showRequest} from '../../eth/interaction';
import CardList from "../common/CardList";
import {Button} from "semantic-ui-react";
import RequestTable from "../common/RequestTable";

class SupporterFundingTab extends Component {
    //简写方式
    state = {
        supporterFundingDetails: [],
        selectedFundingDetail: '',
        requests: [],//把有的花费请求
    };

    async componentWillMount() {


        let supporterFundingDetails = await getFundingDetails(3);
//        console.table('SupporterFundingTab', supporterFundingDetails)
        this.setState({
            supporterFundingDetails
        });
    }

    //传递一个回调函数给CardList,将所选择的Card的详细信息返回回来
    onCardClick = (selectedFundingDetail) => {
        //console.log('ccc', selectedFundingDetail);
        this.setState({
            seletedFundingDetail: selectedFundingDetail,
        })
    };
    handleShowRequests = async () => {
        let fundingAddress = this.state.seletedFundingDetail.fundingAddress;
        try {
            let requests = await showRequest(fundingAddress);
            console.table('requests', requests);
            this.setState({
                requests,
            })
        } catch (e) {
        }
    };

    handleApprove = async (index) => {

        console.log('批准按钮点击', index);
        //1. 指定合约的地址
        //2. 指定选择请求的index
        try {
            let res = await approveRequest(this.state.seletedFundingDetail.fundingAddress, index)
        } catch (e) {
        }

    };

    render() {
        let {supporterFundingDetails, seletedFundingDetail, requests} = this.state;
        return (
            <div>
                <CardList details={supporterFundingDetails}
                          onCardClick={this.onCardClick}
                />
                {
                    seletedFundingDetail && (<div>
                        <Button onClick={this.handleShowRequests}>申请详情</Button>
                        <RequestTable requests={requests}
                                      handleApprove={this.handleApprove}
                                      pageKey={3}
                        />
                    </div>)
                }
            </div>
        )

    }
};

export default SupporterFundingTab;