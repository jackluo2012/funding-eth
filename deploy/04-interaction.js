//1 .导入合约实例
let instance = require('./03-instance');
const from = '0x4E4c6a3655A5863089f9341ff61D3d8BeE00384a';


//异步调用,返回值是一个promise
//2。读取数据
/*
instance.methods.getMessage().call().then(data => {
    console.log('data: ', data);
    //3.写入数据
    instance.methods.setMessage('Hello JackLuo').send({
        from: from,
        value: 0
    }).then(res => {
        //4.读取数据
        console.log('res :', res)
        instance.methods.getMessage().call().then(data => {
            console.log('data2: ', data);
        })
    })
});
*/

// web3与区块链交互的返回值都是promise,可以直接使用async/await
let test = async () => {
    try {
        let v1 = await instance.methods.getMessage().call()
        console.log('v1:', v1)
        let res = await instance.methods.setMessage('Hello Jackluo').send({
            from: from,
            value: 0
        });
        console.log('res:', res)
        let v2 = await instance.methods.getMessage().call()
        console.log('v2:', v2)
    } catch (e) {
        console.log(e)
    }
};

test();