import type { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from "cloudinary";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body) || {};
    const { paramsToSign } = body;
    console.log("to api route");
    console.log(paramsToSign);
  

  
    try {
      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_SECRET as string
      );
      res.json({ signature });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
}