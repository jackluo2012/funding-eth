// 1.引入web3
let Web3 = require('web3');

// 2.new 一个web3实例
let web3 = Object;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        // Request account access if needed
        window.ethereum.enable().then(data => {
//            console.log(data);
        });
    } catch (error) {
        // User denied account access...
        console.log('未获取授权!!!!');
    }
}
// Legacy dapp browsers...
else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
}
//es 6的语法 ,default 标识mo认导出,在使用时，名字可以改变
// 使用时用import导入
export default web3;
