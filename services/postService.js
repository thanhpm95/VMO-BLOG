import Posts from "../models/postModel"

function getAllPosts(){
    return Posts.findAll();
    // console.log(Users)
}

function getOnePost(postId){
  return Posts.findOne({
    where:{
      id: postId
    }
  });
  // console.log(Users)
}

function createNewPost(post){
  return Posts.create(post);
  // console.log(Users)
}

function updatePost(postId, post){
  return Posts.update(
    {
      title: post.title,
      content: post.content
    },
    {
    where:{
      id: postId
    }
  });
// console.log(Users)
}

function deletePost(postId){
  return Posts.destroy({
    where:{
      id: postId
    }
  });
// console.log(Users)
}


module.exports = {
  getAllPosts : getAllPosts,
  getOnePost: getOnePost,
  createNewPost: createNewPost,
  updatePost: updatePost,
  deletePost: deletePost
}