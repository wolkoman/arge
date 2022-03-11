import { AWSError } from "aws-sdk";
import SESV2, {
  CreateEmailTemplateRequest,
  SendBulkEmailRequest,
  SendEmailRequest,
  SendEmailResponse,
} from "aws-sdk/clients/sesv2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(500).end();
}
