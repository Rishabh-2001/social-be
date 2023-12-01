const {Users} =require('../db/models')

async function setProfile(profileData)
{
 
        console.log("data PROFILE arecieved in DB:", profileData);
        const {id}=profileData;

         await Users.update(
            {
             bio: profileData?.bio,
             ig: profileData?.ig,
             fb: profileData?.fb,
             twitter: profileData?.twitter,
             linkedIn: profileData?.linkedIn,
             location: profileData?.location,
             designation: profileData?.desig,
             birthday: profileData?.birthday,
             gender: profileData?.gender,
            },
            {
                where: {id:id}
            }
         )
         .then(DBres=>{
            console.log("SUCCESS DB OPERATION PROFILEEE ", DBres);
            return DBres;
         })
         .catch(err=>{
            console.log("Error IN DB:",err);
            throw err;
         })   
}

async function getProfile(id)
{
    try {
        // console.log("Getting the notification of ", userId);
        const profile = await Users.findAll({
            where: { id: id },
        });
        return profile;
    } catch (error) {
        console.log("Error occurred  while fetching the profile data ", error);
        throw error;
    }
}



module.exports={
    setProfile,
    getProfile   
}