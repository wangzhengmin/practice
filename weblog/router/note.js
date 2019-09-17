let DB = require('../module/mongodb_module');
let router =require('koa-router')();
//获取笔记列表
router.get('/list', async (ctx)=>{
    ctx.body='fsdaf';
})
//添加笔记
router.post('/add', async (ctx)=>{

})
//删除笔记
router.get('/delete', async (ctx)=>{

})
//修改笔记
router.post('/update', async (ctx)=>{

})

module.exports=router.routes();