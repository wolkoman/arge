import { AWSError } from "aws-sdk";
import SESV2, {
  CreateEmailTemplateRequest,
  SendBulkEmailRequest,
  SendEmailRequest,
  SendEmailResponse,
} from "aws-sdk/clients/sesv2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  fetch("https://api.netlify.com/build_hooks/60021ab09b131e1076eda56a", {method: "POST"})
    .then(() => setTimeout(() => res.redirect('/status'), 3000))
    .catch(() => res.end("Es ist ein Fehler aufgetreten"));
}
