import { UserModel } from '../models/user.model.js'
import asynchandler from './Asynchandler.js'
export const assignBadges=asynchandler(async (user) => {
    if(!badge){
        throw new Error("Provide Badge in Utility Function")
    }
    const user=await UserModel.findOne(user)
    if(!user){
        return res.status(400)
        .json({mesage:"user not found in Badge service"})
    }
    const hackathonParticipated=user.participatedIn
    let badgeType=null
    if(hackathonParticipated<=5){

        return {leagueMessage:"League Cannot be upgraded"}
    }
    if (hackathonParticipated.length >= 15) {
        badgeType = 'gold';
      } else if (hackathonParticipated.length >= 10) {
        badgeType = 'silver';
      } else if (hackathonParticipated.length >= 5) {
        badgeType = 'bronze';
      }

    if(badgeType){
        await UserModel.findByIdAndUpdate(
            {_id:user._id},
            {league:badgeType},
            {new:true}
        )
        await Badge.findOneAndUpdate(
            { users: user._id },
            { type: badgeType },
            { new: true }
          );
        return {leagueMessage:`League Upgraded to ${badgeType}`}; // Return true to indicate success
        } else {
            throw new Error('badgeType is not provided or invalid');
            }
    
})