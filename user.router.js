const{createUser,getUsers,getUsersbyUserId,deleteByUserId,updateUserById,login} =require("./user.controller");
const router=require("express").Router();
const {checkToken}=require("../../auth/token_validation");
router.post("/",checkToken,createUser);
router.get('/',checkToken,getUsers);
router.get('/:id',checkToken,getUsersbyUserId);
router.patch('/:id',checkToken,updateUserById);
router.delete('/',checkToken,deleteByUserId)
router.post('/login',login)

module.exports=router;