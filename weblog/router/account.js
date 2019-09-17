let router = require('koa-router')();
let DB = require('../module/mongodb_module');
//获取账号详情信息
router.get('/details', async (ctx)=>{
    console.log(ctx.query);
    ctx.body='fsdf';
})
//修改账号信息
router.post('/update', async (ctx)=>{
    let data=ctx.request.body;
    let result = await DB.update('account',data.condition,data.data);
    if(result.result.n==1)
        ctx.body='修改成功';
    else
        ctx.body='修改失败';
})
router.post('/head', async (ctx)=>{
    let result = await DB.update('account',{account:ctx.request.body.account},{head:ctx.request.body.head});
    if(result.result.n==1)
        ctx.body='修改成功';
    else
        ctx.body='修改失败';
})
//获取用户列表
router.get('/list', async (ctx)=>{

})
//删除用户
router.get('/delete', async (ctx)=>{

})
module.exports=router.routes();