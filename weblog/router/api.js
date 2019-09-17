let router = require('koa-router')();
let DB = require('../module/mongodb_module');
let Share = require('./share');
let Note = require('./note');
let Account = require('./account');

router.get('/',async (ctx)=>{
        ctx.body='api接口';
})
router.use('/note',Note)

router.use('/share',Share)

router.use('/account',Account)

module.exports=router.routes();