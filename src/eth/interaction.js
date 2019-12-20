import web3 from '../utils/initWeb3';
import {fundingFactoryInstance, newFundingInstance} from "./instance";

let getFundingDetails = async (index) => {

    //index 1：代表所有的页面， 2：我发起的页面，3：我参与的页面
    // 整个显示 card详情逻辑是可以复用的,唯一不同的就是返回的众筹数组不同
    //所以可以使用if语句进行控制，从而复用代码

    //当合约方法中使用了msg.sender,那么ji使是call方法，也要指定from字段 ,否则数据出错。
    let accounts = await web3.eth.getAccounts();

    let currentFundings = [];
    if (index == 1) {
        currentFundings = await fundingFactoryInstance.methods.getAllFundings().call({
            from: accounts[0]
        });
    } else if (index == 2) {
        currentFundings = await fundingFactoryInstance.methods.getCreatorFundings().call({
            from: accounts[0]
        });
    } else if (index == 3) {
        currentFundings = await fundingFactoryInstance.methods.getSupportorFundings().call({
            from: accounts[0]
        });
    } else {

    }
    // funding地址数组
    //可以格式化 结构数据
    //console.table(creatorFundings)
    let detailsPromise = currentFundings.map((fundingAddress) => {
        //console.log(fundingAddress);
        // 1.把Funding实例拿出来

        return new Promise(async (resolve, reject) => {
            //fundingInstance.options.address = fundingAddress;
            try {
                let newInstance = newFundingInstance();
                newInstance.options.address = fundingAddress;
                // 2.对实例进行填充地址，可以使用了
                // 这个instance 是只有一个,后面的地址把前面的地址覆盖了，

                // 3.调用方法，返回funding合约详情
                let projectName = await newInstance.methods.projectName().call();
                let manager = await newInstance.methods.manager().call();
                let targetMoney = await newInstance.methods.targetMonery().call();
                let supportMoney = await newInstance.methods.supportMoney().call();
                let leftTime = await newInstance.methods.getLeftTime().call();

                let balance = await newInstance.methods.getBalance().call();
                let investorCount = await newInstance.methods.getInvestorsCount().call();


                return resolve({
                    fundingAddress,
                    manager,
                    projectName,
                    targetMoney,
                    supportMoney,
                    leftTime,
                    balance,
                    investorCount
                });
            } catch (e) {
                reject(e)
            }
        });
    });
    //把多个promise处理成一个promise
    return Promise.all(detailsPromise);
    // detailInfo.then(detail => {
    //     console.log(detail);
    // });
};

const createFunding = (projectName, targetMoney, supportMoney, duration) => {

    return new Promise(async (resolve, reject) => {
        //调用创建方法
        try {
            let accounts = await web3.eth.getAccounts();
            let res = await fundingFactoryInstance.methods.createFunding(projectName, targetMoney, supportMoney, duration).send({
                from: accounts[0],
            });
            resolve(res)
        } catch (e) {
            reject(e)
        }
    });


};

const createRequest = (fundingAddress, purpose, cost, seller) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fundingInstance = newFundingInstance();
            let accounts = await web3.eth.getAccounts();
            fundingInstance.options.address = fundingAddress;

            let res = fundingInstance.methods.createRequest(purpose, cost, seller).send({
                from: accounts[0]
            });
            console.log('createRequest', res);
            resolve(res)
        } catch (e) {
            reject(e)
        }
    });
};

const showRequest = (fundingAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fundingInstance = newFundingInstance();
            let accounts = await web3.eth.getAccounts();
            fundingInstance.options.address = fundingAddress;
            //获取花费请求的数量
            let requestCount = await fundingInstance.methods.getRequestsCount().call({
                from: accounts[0]
            });
            let requestDetails = [];
            //遍历请求数量，依次获取每一个请求的详情，添加到数组中，最后使用promise返回
            for (let i = 0; i < requestCount; i++) {
                let requestDetail = await fundingInstance.methods.getRequestByIndex(i).call({
                    from: accounts[0]
                });
                requestDetails.push(requestDetail);
            }
            resolve(requestDetails)
        } catch (e) {
            reject(e)
        }
    });
};

//
const handleInvestFunc = (fundingAddress, supportMoney) => {

    return new Promise(async (resolve, reject) => {
        try {
            let fundingInstance = newFundingInstance();
            let accounts = await web3.eth.getAccounts();

            fundingInstance.options.address = fundingAddress;

            let res = fundingInstance.methods.invest().send({
                from: accounts[0],
                value: supportMoney,
            });

            resolve(res)
        } catch (e) {
            reject(e)
        }
    });

};


/**
 *  发送 批准 请求
 * @param fundingAddress
 * @param index
 * @returns {Promise<any>}
 */

let approveRequest = (fundingAddress, index) => {

    return new Promise(async (resolve, reject) => {
        try {
            let fundingInstance = newFundingInstance();
            let accounts = await web3.eth.getAccounts();

            fundingInstance.options.address = fundingAddress;

            let res = fundingInstance.methods.approveRequest(index).send({
                from: accounts[0],
            });

            resolve(res)
        } catch (e) {
            reject(e)
        }
    });

};

let finalizeRequest = (fundingAddress, index) => {

    return new Promise(async (resolve, reject) => {
        try {
            let fundingInstance = newFundingInstance();
            let accounts = await web3.eth.getAccounts();

            fundingInstance.options.address = fundingAddress;

            let res = fundingInstance.methods.finalizeRequest(index).send({
                from: accounts[0],
            });

            resolve(res)
        } catch (e) {
            reject(e)
        }
    });

};

//创建花费表单


export {
    getFundingDetails,
    createFunding,
    handleInvestFunc,
    createRequest,
    showRequest,
    approveRequest,
    finalizeRequest
}