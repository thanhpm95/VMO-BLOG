import Users from "../models/userModel"

function getAllUsers(){
    return Users.findAll(
        {
            attributes: { exclude: ['password'] }
        }
    );
    // console.log(Users)
}

function getUserById(id){
    return Users.findOne({
        where:{
            id
        },
        attributes: { exclude: ['password'] }
    })
}

function getUserByUserName(username){
    return Users.findOne({
        where:{
            username
        }
    })
}

function updateUserType(id, type){
    return Users.update({
        type
        },{
            where:{
                id
            }
        }
    )
}


function deleteUser(id){
    return Users.destroy({
            where:{
                id
            }
        }
    )
}



module.exports = {
    getAllUsers : getAllUsers,
    getUserById : getUserById,
    getUserByUserName: getUserByUserName,
    updateUserType: updateUserType,
    deleteUser: deleteUser
}