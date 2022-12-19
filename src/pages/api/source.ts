import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../services/api";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   const response = api.get(`https://api.apilayer.com/world_news/extract-news?url=${process.env.URL}&analyze=true`, {
    headers: {
      apikey: process.env.SECRET_API_KEY,
    },
    
  })

   return res.status(201).json({
      data:(await response).data
   })
}