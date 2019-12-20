import React, {Component} from 'react';
import {createRequest, finalizeRequest, getFundingDetails, showRequest} from '../../eth/interaction';
import CardList from "../common/CardList";
import CreateFundingForm from "./CreateFundingForm";
import {Button, Form, Label, Segment} from 'semantic-ui-react';
import RequestTable from '../common/RequestTable';

class CreatorFundingTab extends Component {
    //简写方式
    state = {
        creatorFundingDetails: [],
        seletedFundingDetail: '',
        requestDesc: '',// purpose,项目方花费的目的
        requestBalance: '',//cost,花费金额
        requestAddress: '',//seller，卖家地址
        requests: [],//把有的花费请求
    };

    async componentWillMount() {


        let creatorFundingDetails = await getFundingDetails(2);

        this.setState({
            creatorFundingDetails
        });
//        console.table(creatorFundingsDetails);
    }

    //传递一个回调函数给CardList,将所选择的Card的详细信息返回回来
    onCardClick = (selectedFundingDetail) => {
        console.log('bbb', selectedFundingDetail);
        this.setState({
            seletedFundingDetail: selectedFundingDetail,
        })
    };
    //表单发生数据变化时触发
    handleChange = (e, {name, value}) => this.setState({[name]: value});
    handleCreateRequest = async () => {
        let {creatorFundingDetails, seletedFundingDetail, requestDesc, requestBalance, requestAddress} = this.state
        console.log(requestDesc, requestBalance, requestAddress);

        //创建花费请求
        // function createRequest(string _purpose, uint256 _cost, address _seller) onlyManager public {
        try {
            let res = await createRequest(seletedFundingDetail.fundingAddress, requestDesc, requestBalance, requestAddress)
        } catch (e) {
            console.log(e)
        }

    };
    handleShowRequests = async () => {
        let fundingAddress = this.state.seletedFundingDetail.fundingAddress;

        try {
            let requests = await showRequest(fundingAddress);
            this.setState({
                requests,
            })
        } catch (e) {
        }
    };
    handleFinalize = async (index) => {
        let fundingAddress = this.state.seletedFundingDetail.fundingAddress;

        try {
            let res = await finalizeRequest(fundingAddress, index);
            console.log(res);
        } catch (e) {
        }
    };

    render() {
        let {
            creatorFundingDetails, seletedFundingDetail,
            requestDesc, requestBalance, requestAddress,
            requests,

        } = this.state;
        return (
            <div>
                <CardList details={creatorFundingDetails}
                          onCardClick={this.onCardClick}
                />
                <CreateFundingForm/>
                {
                    <div>
                        <h3>发起付款请求</h3>

                        <Segment>
                            <h4>当前项目:{seletedFundingDetail.projectName}, 地址: {seletedFundingDetail.fundingAddress}</h4>
                            <Form onSubmit={this.handleCreateRequest}>
                                <Form.Input type='text' name='requestDesc' required value={requestDesc}
                                            label='请求描述' placeholder='请求描述' onChange={this.handleChange}/>

                                <Form.Input type='text' name='requestBalance' required value={requestBalance}
                                            label='付款金额' labelPosition='left' placeholder='付款金额'
                                            onChange={this.handleChange}>
                                    <Label basic>￥</Label>
                                    <input/>
                                </Form.Input>

                                <Form.Input type='text' name='requestAddress' required value={requestAddress}
                                            label='商家收款地址' labelPosition='left' placeholder='商家地址'
                                            onChange={this.handleChange}>
                                    <Label basic><span role='img' aria-label='location'>📍</span></Label>
                                    <input/>
                                </Form.Input>

                                <Form.Button primary content='开始请求'/>
                            </Form>
                        </Segment>
                    </div>
                }

                {
                    seletedFundingDetail && (<div>
                        <Button onClick={this.handleShowRequests}>申请详情</Button>
                        <RequestTable requests={requests}
                                      handleFinalize={this.handleFinalize}
                                      pageKey={2}
                                      investorCount={seletedFundingDetail.investorCount}
                        />
                    </div>)
                }

            </div>
        )
    }
};

export default CreatorFundingTab;