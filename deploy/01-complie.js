//导入solc 编译器
let solc = require('solc') //配合合约版本号
let fs = require('fs')
//读取合约
let sourceCode = fs.readFileSync('../contracts/Lottery.sol','utf-8');

//var input = 'contract x { function g() {} }'
// Setting 1 as second paramateractivates the optimiser
//编译合约
let output = solc.compile(sourceCode, 1)
//console.log(output['contracts'])
module.exports = output['contracts'][':Lotter'];