let router = require('koa-router')();
let fs = require('fs');
let path = require('path');
let DB = require('../module/mongodb_module');
let md5 = require('md5-node');
//获取分享列表
router.get('/list', async (ctx)=>{
   let result = await DB.find('share',ctx.query,{});
   ctx.body=result;
})
//按点赞数排序
router.get('/sort', async (ctx)=>{
    ctx.query.zanLen=parseInt(ctx.query.zanLen);
    let result = await DB.find('share',{},ctx.query);
    ctx.body=result;
})
//添加分享
router.post('/add', async (ctx)=>{
    let data=ctx.request.body;
    let time=new Date().getTime();
    data.argu=[];
    data.zan=[];
    data.time=time;
    data.zanLen=0;
    data.arguLen=0;
    if(typeof data.imgs=='string'){
        let imgs=[];
        imgs.push(data.imgs);
        data.imgs=imgs;
    }
    let result=await DB.insert('share',data);
    if(result.result.n==1)
        ctx.body=ctx.request.body;
    else
        ctx.body='发布失败';
})
//添加评论
router.post('/update', async (ctx)=> {
    let data=ctx.request.body
    data.condition.time=parseInt(data.condition.time);
    data.zanLen=parseInt(data.zanLen);
    data.arguLen=parseInt(data.arguLen);
    let result=await DB.update('share',data.condition,{[data.attr]:data.data,zanLen:data.zanLen,arguLen:data.arguLen});
   ctx.body='';
})
//删除分享
router.get('/delete', async (ctx)=>{

})
module.exports=router.routes()