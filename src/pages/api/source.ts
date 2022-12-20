import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../services/api";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   const response = await api.get(`http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=8&?ate=27-11-2022`)

   return res.status(201).json({
      data: response.data
   })
}