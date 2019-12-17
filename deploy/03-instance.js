//获取 合约实例，导出合约实例
let {bytecode, interface} = require('./01-complie')

// 1.引入web3
let Web3 = require('web3')
// 2.new 一个web3实例
let web3 = new Web3()
// 3.设置网络
let isConnect = web3.setProvider('http://localhost:7545')
// 合约的abi
let abi = [{"constant":false,"inputs":[{"name":"message","type":"string"}],"name":"setMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMessage","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"str","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
//合约地址
let address = '0x7f61E1A3970777C3C25DA410fD6E2c3CfCFB953a';
//此处abi 已经是json对象了不需要进行parse动作
let contractInstance = new web3.eth.Contract(abi,address);

//console.log('address',contractInstance.options.address);
module.exports = contractInstance;