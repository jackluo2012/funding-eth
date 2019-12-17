// 1. web3
// 2. address
// 3. abi

import web3 from '../utils/initWeb3';

let abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getSupportorFundings",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "platformManager",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_projectName",
                "type": "string"
            },
            {
                "name": "_targetMonery",
                "type": "uint256"
            },
            {
                "name": "_supportMoney",
                "type": "uint256"
            },
            {
                "name": "_duration",
                "type": "uint256"
            }
        ],
        "name": "createFunding",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAllFundings",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCreatorFundings",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];

let fundingFactoryAddress = '0x9604D8c7386762546faca6E09Ae28Fbe6080bbe2';

let fundingFactoryInstance = new web3.eth.Contract(abi, fundingFactoryAddress);

export {
    fundingFactoryInstance
}