import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../services/api";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   const timeElapsed = Date.now();
   const today = new Date(timeElapsed);
   const Atedate = today.toLocaleDateString().replace('/', '-').replace('/', '-');
   const Dedate = (`${today.getDate()}` + '-' + `${today.getMonth() - 2}` + '-' + `${today.getFullYear()}`);

   const response = await api.get(`http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=8&?ate=${Atedate}&?de=${Dedate}`)

   return res.status(201).json({
      data: response.data
   })
}