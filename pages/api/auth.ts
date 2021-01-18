import { NextApiRequest, NextApiResponse } from "next";
import { authenticateCockpit } from "../../util/cockpit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    !req.query.user ||
    !req.query.password ||
    Array.isArray(req.query.user) ||
    Array.isArray(req.query.password)
  ) {
    res.status(400);
    res.end();
    return;
  }

  authenticateCockpit(req.query.user, req.query.password)
    .then(user => res.end(JSON.stringify(user)))
    .catch(() => {
      res.status(401);
      res.end();
    });
}
