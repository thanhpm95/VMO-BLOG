import { validationResult } from "express-validator"
import { authService } from "../services/index"
import { transErrors, transSuccesss } from "../lang/vi"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const tokenSecretKey = '123456';
const refeshTokenSecretkey = '654321'

module.exports.login = async (req, res) =>{
  let username = req.body.username;
  let password = req.body.password;

  try{
    let user = await authService.findUserByUserName(username);
    
    if(user){
      let passwordHash = user.password;
      let userId = user.id;

      let dataUser = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        gender: user.gender
      }

      if(bcrypt.compareSync(password, passwordHash)){
        let token = jwt.sign(dataUser, tokenSecretKey)
        let refeshToken = jwt.sign(dataUser, refeshTokenSecretkey)

        req.headers.authorization = token

        let checkTokenExits = await authService.findUserTokenByUser(userId);

        // console.log(checkTokenExits);

        //delete old refresh token
        if(checkTokenExits){
          await authService.destroyToken(userId)
        }

        //create new refresh token
        await authService.insertToken(userId, refeshToken)

        let result = {dataUser, token, refeshToken}

        res.status(203).json(result);
      }
      else{
        res.status.json(transErrors.login_failed)
      }
      
    }
    else{
      res.status.json(transErrors.user_undefined)
     }
  }
  catch(err){
    console.log(err)
  }
}


module.exports.register = async (req, res) =>{
  //defaut type = 1 (user)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let {username, password, gender, fullName } = req.body;

  
  try{
    let user = await authService.findUserByUserName(username);

    if(user){
      return res.json(transErrors.user_exits)
    }

    await authService.createUser(username, password, fullName, gender);
    
    return res.json(transSuccesss.register_success);
  }
  catch(err){
    console.log(err)
  }
}


module.exports.refreshToken = async (req, res) =>{

  let loginUser = req.loginUser;

  let { refreshToken } = req.body;

  // console.log(refreshToken)
  
  try{
    let user = await authService.findUserByUserName(loginUser.username);

    // console.log(user);
    
    if(!user){
      return res.json(transErrors.user_undefined)
    }

    let checkTokenExist = await authService.findUserTokenByToken(refreshToken);

    if(!checkTokenExist){
      return res.json(transErrors.token_undefined)
    }

    let dataUser = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      gender: user.gender
    }

    let acessToken = jwt.sign(dataUser, tokenSecretKey)
    // let newUser = await authService.createUser(username, password, fullName, gender);
    req.headers.authorization = acessToken

    return res.json(acessToken);
  }
  catch(err){
    console.log(err)
  }
}