let path=require('path')

let Koa = require('koa');
let app =new Koa();

let Router =require('koa-router');
let router=new Router();

let static =require('koa-static')
app.use(static('static'))

const cors=require('koa-cors')
app.use(cors());

// let  bodyParser = require('koa-bodyparser');
// app.use(bodyParser());
const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
const render=require('koa-art-template')

render(app, {
    root:path.join(__dirname, 'views'),
    extname: '.ejs',
    debug: process.env.NODE_ENV !== 'production'
});

let Index=require('./router/index');
app.listen(8000);

router.use('/',Index)

app.use(router.routes()).use(router.allowedMethods())