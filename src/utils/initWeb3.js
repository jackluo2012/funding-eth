// 1.引入web3
let Web3 = require('web3');

// 2.new 一个web3实例
let web3 = Object;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        // Request account access if needed
        window.ethereum.enable().then(data => {
            console.log(data);
        });
    } catch (error) {
        // User denied account access...
    }
}
// Legacy dapp browsers...
else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
}

module.exports = web3;
