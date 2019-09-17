let MongoClient=require('mongodb').MongoClient;
let ObjectId=require('mongodb').ObjectId;
let dburl='mongodb://localhost:27017/';
let dbname="weblogg"
class DB{
    static con(){
        if(!DB.instance){
            DB.instance=new DB();
        }
        return DB.instance;
    }
    constructor(){
        this.dbClient='';
        //this.dbconnect();
    }
    dbconnect(){
        return new Promise((resolve,reject)=>{
            if(!this.dbClient){
                MongoClient.connect(dburl,(err,client)=>{
                    if(err){
                        //console.log('数据库连接失败');
                        reject(err);
                    }else{
                        //console.log('数据库连接成功');
                        this.dbClient=client;
                        resolve(this.dbClient);
                    }
                })
            }else{
                resolve(this.dbClient);
            }
        })
    }
    insert(table,data){
        return new Promise((resolve,reject)=>{
            this.dbconnect().then((client)=>{
                let db=client.db(dbname);
                db.collection(table).insertOne(data,(error,result)=>{
                    if(error){
                        //console.log('插入数据库发生错误');
                        reject(error);
                    }else{
                        //console.log('插入数据库成功');
                        resolve(result);
                    }
                })
            })
        })
    }

    find(table,condition,sort){
        return new Promise((resolve,reject)=>{
            this.dbconnect().then((client)=>{
                let db=client.db(dbname);
                db.collection(table).find(condition).sort(sort).toArray((error,result)=>{
                    if(error){
                        //console.log('查询数据发生错误');
                        reject(error);
                    }else{
                        //console.log('查询数据成功');
                        resolve(result);
                    }
                })
            })
        })
    }

    delete(table,condition){
        return new Promise((resolve,reject)=>{
            this.dbconnect().then((client)=>{
                let db=client.db(dbname);
                db.collection(table).deleteOne(condition,(error,result)=>{
                    if(error){
                        //console.log('删除数据发生错误');
                        reject(error);
                    }else{
                        //console.log('删除数据成功');
                        resolve(result);
                    }
                })
            })
        })
    }

    update(table,condition,data){
        return new Promise((resolve,reject)=>{
            this.dbconnect().then((client)=>{
                let db=client.db(dbname);
                db.collection(table).updateOne(condition,{$set:data},(error,result)=>{
                    if(error){
                        //console.log('更新数据发生错误');
                        reject(error);
                    }else{
                        //console.log('更新数据成功');
                        resolve(result);
                    }
                })
            })
        })
    }

    getObjectId(id){
        return new ObjectId(id);
    }
}
module.exports=DB.con();


