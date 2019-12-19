let {bytecode, interface} = require('./01-complie')
//const HDWalletProvider = require("@truffle/hdwallet-provider");


//console.log(bytecode)
//console.log(interface) 

// 1.引入web3
let Web3 = require('web3')
// 2.new 一个web3实例
let web3 = new Web3()
let mnemonic = "end birth ripple elder spice govern trend depend reward uphold miss crater";
//let provider = new HDWalletProvider(mnemonic, "http://localhost:8545");
// 3.设置网络
let isConnect = web3.setProvider('http://localhost:7545')

console.log(interface);
// 1. 拼接合约数据 interface
let contract = new web3.eth.Contract(JSON.parse(interface))

deploy = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);
    return await contract.deploy({
        data: bytecode,//合约bytecode
       // arguments: [] //给构造函数传递参数,使用数组
    }).send({
        from: accounts[0],
        gas: '3000000',// 不要用mo认值，一定要写大一些,要使用引号
        //gasPrice: '1',
    }).then(instance =>{
        console.log('address :',instance.options.address)
    });
};
deploy();
// let instance = deploy();
// console.log(instance);
//console.log(isConnect)
//console.log("version:", web3.version)
//console.log(web3.eth.currentProvider)
/*

// 2. 拼接bytecode
contract.deploy({
    data: bytecode,//合约bytecode
    arguments: [] //给构造函数传递参数,使用数组
}).send({
    from: account,
    gas: '3000000',// 不要用mo认值，一定要写大一些,要使用引号
    //gasPrice: '1',
}).then(instance =>{
    console.log('address :',instance.options.address)
});
// 3. 合约部署
*/
