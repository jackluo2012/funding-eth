import React from 'react'
import {Card, Image, List, Progress} from 'semantic-ui-react'

const src = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
const CardList = (props) => {

    let details = props.details;

    let onCardClick = props.onCardClick;
    if (details) {
        let cards = details.map((detail) => {
            return <CardFunding key={detail.fundingAddress} detail={detail}
                                onCardClick={onCardClick}
                                color='red' image={src}/>
        });

        return (
            <Card.Group itemsPerRow={4}>

                {
                    cards
                }


            </Card.Group>
        )
    }
};


const CardFunding = (props) => {

    let detail = props.detail;

    let onCardClick = props.onCardClick;

    let {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorCount} = detail;
    let percent = parseFloat(balance) / parseFloat(targetMoney * 10 ** 18) * 100;
    return (
        <Card onClick={() => {
            onCardClick && onCardClick(detail)
        }}>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{projectName}</Card.Header>
                <Card.Meta>
                    <span className='date'>剩下时间: {leftTime}</span>
                    <Progress percent={percent} progress size='small'/>
                </Card.Meta>
                <Card.Description>
                    用过的都说好!!
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <List horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                    <List.Item>
                        <List.Content>
                            <List.Header>已筹</List.Header>
                            {balance} wei
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>已达</List.Header>
                            {percent} %
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>参与人数</List.Header>
                            {investorCount}
                        </List.Content>
                    </List.Item>
                </List>
            </Card.Content>
        </Card>
    );
}


export default CardList

