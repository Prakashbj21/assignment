const {create,getUsersbyUserId,
    getUsers,
    updateUserById,
    deleteByUserId,
    getUserByUserEmail}=require("./user.service");
const {genSaltSync,hashSync,compareSync}=require("bcrypt");
const {sign}=require("jsonwebtoken");
module.exports={
    createUser: (req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
       //body.password=hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            return res.status(200).json(
                {
                    success:1,
                    data: results
                }
            );
        });
    },
    getUsersbyUserId: (req,res)=>{
        const id=req.params.id;
        getUsersbyUserId(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json(
                    {
                        success:0,
                        message:"Record not Found"
                    }

                );
            }
            return res.json({
                success:1,
                data:results
            });

        });
    },
    getUsers: (req,res)=>{
    
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json(
                {
                    success:1,
                    data: results
                }
            );
        });
    },
    updateUserById: (req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
       // body.password=hashSync(body.password,salt);
        updateUserById(body,(err,results)=>{
            if(err){
                console.log(err);
                return ;
            }
            return res.json(
                {
                    success:1,
                    data: "Updated Successfully"
                }
            );
        });
    },
    deleteByUserId: (req,res)=>{
        const body=req.body;
        
        deleteByUserId(body,(err,results)=>{
            if(err){
                console.log(err);
                return ;
            }
            if(!results){
                return res.json(
                    {
                        success:0,
                        data: "Record not Found"
                    }
                ); 
            }
            return res.json(
                {
                    success:1,
                    data: "User Deleted Successfully"
                }
            );
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
          console.log(results);
        var result;
          if(body.password===results.password){
              result=true;

          }else{
              result=false;
          }
          console.log(body.password+" "+ results.password+" "+result);
          
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "login successfully",
              token: jsontoken
            });
          } else {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
        });
      }

}

