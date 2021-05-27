import { validationResult } from "express-validator"
import { tagService, userService, postService } from "../services/index"

import { transErrors, transSuccesss } from "../lang/vi"


module.exports.getAllTags = async (req, res) =>{
  
  try{
    let tags = await tagService.getAllTags();
    res.json(tags);
   
  }
  catch(err){
    console.log(err)
  }
}

module.exports.getOneTag = async (req, res) =>{
  let tagId = req.params.id;
  try{
    let tag = await tagService.getOneTag(tagId);
    // console.log(tags);
    res.json(tag);
   
  }
  catch(err){
    console.log(err)
  }
}

module.exports.createNewTag = async (req, res) =>{

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let loginUser = req.loginUser;
  let tagName = req.body.tagName;
  let description = req.body.description;
  let postId = req.body.postId

  try{

    let currentUser = await userService.getUserByUserName(loginUser.username);

    if(!currentUser){
      return res.json(transErrors.user_undefined);
    }

    if(currentUser.type < 2){
      return res.json(transErrors.have_not_permission);
    }

    let infotag = {
     tagName: tagName,
     description: description,
     postId: postId
    }

    await tagService.createNewTag(infotag);

    res.json(transSuccesss.tag_created);
   
  }
  catch(err){
    console.log(err)
  }
}

module.exports.updateTag = async (req, res) =>{
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  
  
  let loginUser = req.loginUser;
  let tagId = req.params.id;
  let tagName = req.body.tagName;
  let description = req.body.description;
  let postId = req.body.postId;

  try{

    let currentUser = await userService.getUserByUserName(loginUser.username);

    if(!currentUser){
      return res.json(transErrors.user_undefined);
    }

    let tag = await tagService.getOneTag(tagId);

    if(!tag){
      return res.json(transErrors.tag_undefined);
    }

    let post = await postService.getOnePost(postId);

    if(!post){
      return res.json(transErrors.post_undefined);
    }


    if(currentUser.type < 2){
      return res.json(transErrors.have_not_permission)
    }
    
    let newInfoTag = {
      tagName: tagName,
      description: description,
      postId: postId
    }

    await tagService.updateTag(tagId, newInfoTag);

    return res.json(transSuccesss.tag_updated);
   
  }
  catch(err){
    console.log(err)
  }
}

module.exports.deleteTag = async (req, res) =>{
    
  let loginUser = req.loginUser;
  let tagId = req.params.id;

  try{
    let currentUser = await userService.getUserByUserName(loginUser.username);

    if(!currentUser){
      return res.json(transErrors.user_undefined);
    }

    let tag = await tagService.getOneTag(tagId);

    if(!tag){
      return res.json(transErrors.tag_undefined);
    }

    if(currentUser.type < 2){
      return res.json(transErrors.have_not_permission)
    }

    await tagService.deleteTag(tagId);

    res.json(transSuccesss.tag_deleted);
   
  }
  catch(err){
    console.log(err)
  }
}