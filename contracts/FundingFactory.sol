pragma solidity ^0.4.24;

//import './funding.sol';
// 1. 状态 变量

// 1.所有的众筹合约集合: address[] allFundings
// 2.创建人的合约集合: mapping(address => address[]) createFundings;// key是创建人,
//   value是所创建的所有合约的地址集合
// 3.参与人的合约集合 mapping(address => address[]) supportorFundings; // key是创建人,
// value是所参与的合约的 地址集合

// 2.创建众筹合约的方法
// createFunding(string _name,uint _targetMoney,uint _supportMoney,uint _duration)
contract FundingFactory {
    // 0 平台管理员 address platformManager

    // 1.所有的众筹合约集合 : address[] allFundings

    //

    address public platformManager;
    address[] allFundings;

    mapping(address => address[])creatorFundings; //创建人的合约集合

    //mapping(address => address[])supportorFundings;//参与人的合约集合
    SupportorFundingContract supportorFundings; //

    constructor() public {
        platformManager = msg.sender;
        //在构造函数时候，创建一个全局的SupportorFundingContract合约实例
        supportorFundings = new SupportorFundingContract();
    }
    // "特斯拉",1000000,1,3600
    function createFunding(string _projectName, uint256 _targetMonery, uint256 _supportMoney, uint256 _duration) public {

        //创建一个合约，使用new方法，同时传入参数，返回一个地址
        address funding = new Funding(_projectName, _targetMonery, _supportMoney, _duration, msg.sender, supportorFundings);


        allFundings.push(funding);

        //维护创建者所创建的合约集合
        creatorFundings[msg.sender].push(funding);


    }

    //返回当前平台的所有合约
    function getAllFundings() public view returns (address[]){
        return allFundings;
    }

    //返回当前账户所创建所有的合约
    function getCreatorFundings() public view returns (address[]){
        return creatorFundings[msg.sender];
    }

    //返回当前账户所有的合约
    function getSupportorFundings() public view returns (address[]){
        return supportorFundings.getFundings(msg.sender);
    }

}

//这个合约维护者全局所有参与人所参与的所有众筹合约
contract SupportorFundingContract {

    //参与者的合约集合
    mapping(address => address[]) supportorFundingsMap;

    //  添加容器到集合
    function setFundings(address _supptor, address _funding) public {
        supportorFundingsMap[_supptor].push(_funding);
    }

    // 读取合约的数据
    function getFundings(address _supptor) public view returns (address[]){
        return supportorFundingsMap[_supptor];
    }
}
