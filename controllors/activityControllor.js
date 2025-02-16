const { AppDataSource } = require('../dataSource'); 
const UserActivityTracker = require('../entity/UserActivityTracker')

const updateStatusOfActivity = async(req,res) => {
    try{
        const UserActivityTrackerRepository = AppDataSource.getRepository(UserActivityTracker)
        const {id} = req.params;
        if(!id){
            return res.status(400).send({
                message : "Please send required parameters"
            })
        }
        const rowExistence =  await UserActivityTrackerRepository.findOne({
            where:{
                id ,
                userId : req.userContext.userId,
                status: false
            }
        });
        if(!rowExistence){
            return res.status(404).send({
                message : 'No such record found'
            })
        }
        await UserActivityTrackerRepository.createQueryBuilder().update(UserActivityTracker).set({
            status : true
        }).where({
             id ,
            userId : req.userContext.userId
        }).execute();
        return res.status(200).send({
            message : "Status Updated Successfully"
        })
    }
    catch(e){
        console.error(e)
        return res.status(400).send({
            message : "Something went wrong"
        })
    }
}
module.exports = {
    updateStatusOfActivity
}

