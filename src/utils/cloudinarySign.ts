import * as cloud from 'cloudinary'
const apiSecret = cloud.v2.config().api_secret as string

export const signuploadwidget = () => {
    const timestamp = Math.round((new Date).getTime()/1000);
  
const signature = cloud.v2.utils.api_sign_request({
    timestamp: timestamp,
    source: 'uw',
    folder: 'test_folder',
}, apiSecret)
  
  return { timestamp, signature }
}

   
  
//   module.exports = {
//     signuploadwidget
//   }