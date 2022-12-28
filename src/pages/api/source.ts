import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../services/api";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   
   const timeElapsed = Date.now();
   const today = new Date(timeElapsed);
   const Atedate = today.toLocaleDateString().replace('/', '-').replace('/', '-');
   const Dedate = (`${today.getDate()}` + '-' + `${today.getMonth() - 2}` + '-' + `${today.getFullYear()}`);

   if (req.method === 'POST') {
      const category: string = (req.body.headers.category)
      
      const responsePage = await api.get(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${process.env.SECRET_API_KEY}`)
      
      return res.status(202).json({
         data: responsePage.data
      })
   }
}