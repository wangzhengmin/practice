let DB = require('../module/mongodb_module');
let router =require('koa-router')();
let Api = require('./api');
let md5 = require('md5-node');

router.get('/',async (ctx)=>{
    let time=new Date().getTime();
    ctx.body=time;
})

router.get('login',async (ctx)=>{
    let result=await DB.find('account',ctx.query);
    if(result.length>0){
        result[0].login=md5('login');
        delete result[0].pwd;
        ctx.body=result[0];
    }
    else
        ctx.body='登录失败';

})
router.get('register',async (ctx)=>{
    let result=await DB.find('account',ctx.query);
    if(result.length>0)
        ctx.body='注册失败';
    else{
        ctx.query.name='默认昵称';
        ctx.query.head='D:\\wzm\\practice\\nodejs\\weblog\\static\\images\\moren.png';
        ctx.query.sex='男';
        ctx.query.date='';
        ctx.login=md5('login');
        let bol=await  DB.insert('account',ctx.query);
        if(bol.result.n==1)
            ctx.body=ctx.query;
        else
            ctx.body='登录失败';
    }

})

router.use('api',Api);
module.exports=router.routes();