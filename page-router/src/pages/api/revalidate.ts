import { NextApiRequest, NextApiResponse } from "next";

// On-Demand ISR, 요청을 받을 때 마다 페이지를 다시 생성하는 ISR

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (error) {
    res.status(500).send("Revalidation Failed");
  }
}
