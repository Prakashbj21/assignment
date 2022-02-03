const pool=require("../../config/database");
module.exports={
    create:(data,callBack)=>{
        pool.query(
            'insert into registration(id,firstName,lastName,gender,email,password,number) values(?,?,?,?,?,?,?)',
            [data.id,
                data.firstName,
            data.lastName,
        data.gender,
    data.email,
data.password,
data.number],
(error,results,fields)=>{
    if(error){
       return callBack(error);
    }
    return callBack(null,results);
}
        );
    },
    getUsers:callBack=>{
        pool.query(
            'select id,firstName,lastName,gender,email,password,number from registration',
            [],
            (error,results,fields)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUsersbyUserId:(id,callBack)=>{
        pool.query(
            'select id,firstName,lastName,gender,email,number from registration where id=?',
            [id],
            (error,results,fields)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    updateUserById:(data,callBack)=>{
        pool.query(
            'update registration set firstName=?,lastName=?,gender=?,email=?,password=?,number=? where id=?',
            [
                data.firstName,
            data.lastName,
        data.gender,
    data.email,
data.password,
data.number,data.id],
(error,results,fields)=>{
    if(error){
       return callBack(error);
    }
    return callBack(null,results);
}
        );
    },
   deleteByUserId:(data,callBack)=>{
        pool.query(
            'delete from registration where id=?',
            [data.id],
            (error,results,fields)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      }
}