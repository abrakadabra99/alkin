import db from '@/utils/db';
import Order from '@/models/order';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Signin required!');
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  res.send(order);
};

export default handler;
