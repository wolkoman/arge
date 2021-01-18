import { AWSError } from "aws-sdk";
import SESV2, {
  CreateEmailTemplateRequest,
  SendBulkEmailRequest,
  SendEmailRequest,
  SendEmailResponse,
} from "aws-sdk/clients/sesv2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ses = new SESV2({
    region: process.env.AWSRegion,
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
  });

  sendPersonalized(ses)
    .then(x => res.end(JSON.stringify(x)))
    .catch(x => res.end(JSON.stringify({ error: true, msg: x })));
}

function sendPersonalized(ses: SESV2): Promise<any> {
  return new Promise((res, rej) => {
    const params: SendBulkEmailRequest = {
      DefaultContent: {
        Template: {
          TemplateName: "Test-Mail-1",
          TemplateData: JSON.stringify({ name: "-name-" }),
        },
      },
      FromEmailAddress: "ENI Newsletter <newsletter@eni.wien>",
      BulkEmailEntries: [
        {
          Destination: { ToAddresses: ["superwolko@gmail.com"] },
          ReplacementEmailContent: {
            ReplacementTemplate: {
              ReplacementTemplateData: JSON.stringify({ name: "Manuel" }),
            },
          },
        },
      ],
    };

    ses.sendBulkEmail(params, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}
function createTemplate(ses: SESV2): Promise<any> {
  return new Promise((res, rej) => {
    const params: CreateEmailTemplateRequest = {
      TemplateName: "Test-Mail-1",
      TemplateContent: {
        Html: "<h1>Hello {{name}}!</h1><p>I hope you are doing well!</p>",
        Subject: "Hello",
        Text: "Hello {name}!\n\nI hope you are well",
      },
    };

    ses.createEmailTemplate(params, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}
function sendSimpleMail(ses: SESV2): Promise<any> {
  return new Promise((res, rej) => {
    const params: SendEmailRequest = {
      Destination: { ToAddresses: ["superwolko@gmail.com"] },
      FromEmailAddress: "manuel.wolkowitsch@gmx.net",
      Content: {
        Simple: {
          Subject: { Data: "Meine Mail-Zustellung" },
          Body: {
            Text: { Data: "Diese Mail Zustellung war erforderlich." },
            Html: {
              Data: "Diese <b>Mail</b> Zustellung war <i>erforderlich</i>.",
            },
          },
        },
      },
    };
    ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
      if (err) rej(err);
      else res(data);
    });
  });
}
