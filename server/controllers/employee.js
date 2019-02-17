const DB = require('../config')

async function employee(ctx) {
    await DB.select('employee.*', 'shop.shopname', 'role.name as rolename').from('employee').leftJoin('shop', 'employee.shop', 'shop.id').leftJoin('role', 'employee.role', 'role.id').then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
async function employeebyid(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    await DB.select('*').from('employee').where('id', id).then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
async function roles(ctx) {
    await DB.select('*').from('role').then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
async function employeebyshopid(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    await DB.select('*').from('employee').where('shop', id).then(res => {
        ctx.state.code = 0000;
        ctx.state.data = res;
    })
}
async function editemployee(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    const name = query.name;
    const tel = query.tel;
    const shop = query.shop;
    const role = query.role;
    const username = query.username;
    if (id) {
        await DB('employee').update({
            "name": name,
            "tel": tel,
            "shop": shop,
            "role": role,
            "username": username
        }).where('id', id).then(res => {
            ctx.state.msg = "编辑成功";
            ctx.state.data = res;
        })
    } else {
        await DB('employee').insert({
            "name": name,
            "tel": tel,
            "shop": shop,
            "role": role,
            "username": username
        }).then(res => {
            ctx.state.msg = "添加成功";
            ctx.state.data = res;
        })
    }
}
async function resetpass(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    await DB('employee').update({
        'password': '123456'
    }).then(res => {
        ctx.state.msg = "修改成功";
        ctx.state.data = res;
    })
}
async function delemployee(ctx) {
    const query = ctx.request.body;
    const id = query.id;

    await DB('employee').where('id', id).del().then(res => {
        ctx.state.msg = "删除成功";
        ctx.state.data = res;
    })
}
async function checkshopemployee(ctx) {
    const query = ctx.request.body;
    const id = query.id;
    await DB.from('employee').innerJoin('shop', 'employee.shop', 'shop.id').where('employee.shop', id).then(res => {
        ctx.state.data = res;
    })
}

module.exports = {
    employee,
    editemployee,
    delemployee,
    checkshopemployee,
    employeebyshopid,
    employeebyid,
    roles,
    resetpass
}