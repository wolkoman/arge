import {getInstagramTitle} from "../../util/chatgpt";
import {NextApiRequest, NextApiResponse} from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  res.json(await getInstagramTitle(req.body.value as string))
  return
}