import Tags from "../models/tagModel"

function getAllTags(){
    return Tags.findAll();
    // console.log(Users)
}

function getOneTag(tagId){
  return Tags.findOne({
    where:{
      id: tagId
    }
  });
  // console.log(Users)
}

function createNewTag(tag){
  return Tags.create(tag);
  // console.log(Users)
}

function updateTag(tagId, tag){
  return Tags.update(
    {
      tagName: tag.tagName,
      description: tag.description,
      postId: tag.postId
    },
    {
    where:{
      id: tagId
    }
  });
// console.log(Users)
}

function deleteTag(tagId){
  return Tags.destroy({
    where:{
      id: tagId
    }
  });
// console.log(Users)
}


module.exports = {
  getAllTags : getAllTags,
  getOneTag: getOneTag,
  createNewTag: createNewTag,
  updateTag: updateTag,
  deleteTag: deleteTag
}