const controllers = require('../controllers')

const router = require('koa-router')({
  prefix: '/salesys'
})
//公共接口
router.post('/queryEnums', controllers.common.queryEnums)
//用户类接口
router.post('/login', controllers.user.login)
router.post('/register', controllers.user.register)
router.post('/password/reset', controllers.user.resetpass)
router.post('/user/getuseridbyname', controllers.user.getuseridbyname)
router.post('/user/updateUserInfo', controllers.user.updateUserInfo)
router.post('/user/updatePassword', controllers.user.updatePassword)
router.get('/user/getGroup', controllers.user.getGroup)
//门店类接口
router.get('/shops', controllers.shop.shops)//获取门店列表
router.post('/shopbyid', controllers.shop.shopbyid)//获取门店列表
router.post('/editshops', controllers.shop.editshops)//门店编辑\创建
router.post('/delshop', controllers.shop.delshop)//门店删除
//商品接口
router.get('/classes', controllers.class.classes)
router.post('/classbyid', controllers.class.classbyid)
router.post('/editclass', controllers.class.editclass)//门店编辑\创建
router.post('/delclass', controllers.class.delclass)//门店删除
router.get('/goods', controllers.class.goods)
router.post('/goodbyid', controllers.class.goodbyid)
router.post('/editgood', controllers.class.editgood)//门店编辑\创建
router.post('/delgood', controllers.class.delgood)//门店删除
router.post('/checkgoodclass',controllers.class.checkgoodclass)
//员工接口
router.get('/employee', controllers.employee.employee)
router.post('/employeebyshopid',controllers.employee.employeebyshopid)
router.post('/editemployee', controllers.employee.editemployee)//门店编辑\创建
router.post('/delemployee', controllers.employee.delemployee)//门店删除
router.post('/checkshopemployee',controllers.employee.checkshopemployee)
module.exports = router