// import Order from '../../../models/Order';
// import db from '../../../utils/db';

const handler = async (req, res) => {
  //   const order = req.body;
  console.log(req.body);

  // await db.connect();

  // const order = await Order.findById(req.query.id);
  // await db.disconnect();
  res.send('ok');
};

export default handler;
