const DB = require('../config')

/**
 * 获取分类列表
 *
 */
async function classes(ctx) {
    await DB.select('*').from('class').then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
async function classbyid(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    await DB.select('*').from('class').where('id', id).then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
//添加创建门店
async function editclass(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    const name = query.name;
    if (id) {
        await DB('class').update({
            "name": name,
        }).where('id', id).then(res => {
            ctx.state.msg = "编辑成功";
            ctx.state.data = res;
        })
    } else {
        await DB('class').insert({
            "name": name,
        }).then(res => {
            ctx.state.msg = "添加成功";
            ctx.state.data = res;
        })
    }
}
//删除门店
async function delclass(ctx) {
    const query = ctx.request.body;
    const id = query.id;

    await DB('class').where('id', id).del().then(res => {
        ctx.state.msg = "删除成功";
        ctx.state.data = res;
    })
}
async function goods(ctx) {
    await DB('good').join('class', 'good.class', '=', 'class.id').select('good.*','class.name as classname').then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
async function goodbyid(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    await DB.select('*').from('good').where('id', id).then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
async function editgood(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    const name = query.name;
    const classes = query.class;
    const unit = query.unit;
    const price = query.price;

    if (id) {
        await DB('good').update({
            "name": name,
            "class": classes,
            "unit": unit,
            "price": price
        }).where('id', id).then(res => {
            ctx.state.msg = "编辑成功";
            ctx.state.data = res;
        })
    } else {
        await DB('good').insert({
            "name": name,
            "class": classes,
            "unit": unit,
            "price": price
        }).then(res => {
            ctx.state.msg = "添加成功";
            ctx.state.data = res;
        })
    }
}
//删除门店
async function delgood(ctx) {
    const query = ctx.request.body;
    const id = query.id;

    await DB('good').where('id', id).del().then(res => {
        ctx.state.msg = "删除成功";
        ctx.state.data = res;
    })
}
async function checkgoodclass(ctx) {
    const query = ctx.request.body;
    const id = query.id;

    await DB.from('class').innerJoin('good', 'class.id', 'good.class').where('class.id', id).then(res => {
        ctx.state.data = res;
    })
}
module.exports = {
    classes,
    editclass,
    delclass,
    goods,
    editgood,
    delgood,
    classbyid,
    checkgoodclass,
    goodbyid
}