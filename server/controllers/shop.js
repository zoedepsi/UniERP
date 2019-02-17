const DB = require('../config')

/**
 * 获取门店列表
 *
 * @param {} username
 * @param {} password 
 */
async function shops(ctx) {
    await DB.select('*').from('shop').then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
async function shopbyid(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    await DB.select('*').from('shop').where('id', id).then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
//添加创建门店
async function editshops(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    const shopname = query.shopname;
    const shopaddress = query.shopaddress;
    const shoptel = query.shoptel;
    if (id) {
        await DB('shop').update({
            "shopname": shopname,
            "shopaddress": shopaddress,
            "shoptel": shoptel,
        }).where('id', id).then(res => {
            ctx.state.msg = "编辑成功";
            ctx.state.data = res;
        })
    } else {
        await DB('shop').insert({
            "shopname": shopname,
            "shopaddress": shopaddress,
            "shoptel": shoptel,
        }).then(res => {
            ctx.state.msg = "添加成功";
            ctx.state.data = res;
        })
    }
}
//删除门店
async function delshop(ctx) {
    const query = ctx.request.body;
    const id = query.id;

    await DB('shop').where('id', id).del().then(res => {
        ctx.state.msg = "删除成功";
        ctx.state.data = res;
    })
}


module.exports = {
    shops,
    editshops,
    delshop,
    shopbyid
}