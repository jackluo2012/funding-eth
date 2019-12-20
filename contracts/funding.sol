pragma solidity ^0.4.24;

import './FundingFactory.sol';

contract Funding {
    // 1. 管理员（项目发起人)
    // 2. 项目名称
    // 3. 项目目标筹集金额
    // 4. 每个人支持多少钱
    // 5. 项目持续多少天\

    // 6. 维护所有参考者的数组

    address public manager;
    string public projectName;
    uint256 public targetMonery;
    uint256 public supportMoney;
    uint256 public duration; //持续 时间 秒单位
    uint256 public endTime; // 结束时间

    address[] investors;//维护所有参与人的结构

    SupportorFundingContract supportorFundings;
    // "特斯拉",1000000,1,3600
    constructor(string _projectName, uint256 _targetMonery, uint256 _supportMoney, uint256 _duration, address _creator, SupportorFundingContract _supportorFundings) public {
        manager = _creator;
        //合约创建人(部署)
        projectName = _projectName;
        targetMonery = _targetMonery * 10 ** 18;
        supportMoney = _supportMoney * 10 ** 18;
        // 1个以太坊
        //当前时间+ 持续时间 = 终止时间
        endTime = block.timestamp + _duration;
        // 将合约传递给Funding,在构造中 接收
        supportorFundings = _supportorFundings;
    }
    //使用一个mapping 来判断一个地址是否投标权力
    mapping(address => bool) isInvestorMap;

    //向合约转钱
    function invest() payable public {
        require(msg.value == supportMoney);

        investors.push(msg.sender);

        isInvestorMap[msg.sender] = true;

        //将投资人与当前合约的地址传递到FundingFactory中
        supportorFundings.setFundings(msg.sender, this);

    }

    //退款,由外面（前端）调用
    function refund() onlyManager public {
        for (uint256 i = 0; i < investors.length; i++) {
            investors[i].transfer(supportMoney);
        }
        //删除参考者
        delete investors;
    }
    // 产品状态的枚举： 0: 进行中，1: 已批准，2: 已完成
    enum RequestStatus{
        Voting, Approved, Completed
    }
    //定义花费请求，一个请求由项目方发起，由投资人投票
    struct Request {
        string purpose; //用途 ：买什么？
        uint256 cost;   // 花费金额: 需要多少钱？
        address seller; // 商家地址: 向谁购买?


        uint256 approveCount; //当前已经赞成的票数: 多少人赞成了，超半数则批准支出
        RequestStatus status; // 产品状态

        mapping(address => bool) isVotedMap;//标记已经投过票的人的集合: 赞成人的标识集合,防止投多票;
    }

    Request[] public allRequests;//所有的花费请求的集合

    // 6.创建 花费请求
    // "发动机",1,0xf699e91046ae8bd04f1cee84bece51742afc85e3
    function createRequest(string _purpose, uint256 _cost, address _seller) onlyManager public {
        Request memory req = Request({
            purpose : _purpose,
            cost : _cost * 10 ** 18,
            seller : _seller,
            approveCount : 0,
            status : RequestStatus.Voting

            });

        allRequests.push(req);
    }
    // 7.  批准支付申请
    // 1.检验这个是否投过票,若未投过,则允许投标,反之退出
    // 2.voteCount数据加1.
    // 3.将该投标人在investorVotedMap映射中的值设置为true。
    function approveRequest(uint256 i) public {
        //快速识别是否有投标权力
        require(isInvestorMap[msg.sender]);

        // 一定要使用storage 引用类型,否则无法修改AllRequests[i]的值
        Request storage req = allRequests[i];
        //如果已经投过票，直接退出
        require(req.isVotedMap[msg.sender] == false);

        req.approveCount++;

        req.isVotedMap[msg.sender] = true;
    }
    // 8 完成花费请求
    // 0. 金额足够 > cost
    // 1.票数过半，则执行转账
    // 2. 更新request的状态

    function finalizeRequest(uint256 i) onlyManager public {
        Request storage req = allRequests[i];

        // 0. 金额足够 > cost
        require(address(this).balance >= req.cost);

        //1.投票数过半。
        require(req.approveCount * 2 > investors.length);

        //2.执行转账,给卖家转钱,而不是把钱打给项目方
        req.seller.transfer(req.cost);

        //3.标记成功
        req.status = RequestStatus.Completed;
    }

    //实现权限控制
    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }

    //返回剩下的时间
    function getLeftTime() public view returns (uint256){
        return endTime - block.timestamp;
    }
    //获取投资人的个数
    function getInvestorsCount() public view returns (uint256){
        return investors.length;
    }
    //返回当前的所有请求的数量
    function getRequestsCount() public view returns (uint256){
        return allRequests.length;
    }

    function getRequestByIndex(uint256 i) public view returns (string, uint256, address, uint256, RequestStatus){
        Request memory req = allRequests[i];
        return (req.purpose, req.cost, req.seller, req.approveCount, req.status);
    }

    //获取合约的余额
    function getBalance() public view returns (uint256){
        return address(this).balance;
    }
    //获取 所有的投资人
    function getInvestors() public view returns (address[]){
        return investors;
    }

}