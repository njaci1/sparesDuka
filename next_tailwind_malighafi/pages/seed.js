import user from '../models/User.js';
import data from '../utils/data.js';
import db from '../utils/db';

const handler = async (req, res) => {
  try {
    await db.connect();
    await user.deleteMany();
    await user.insertMany(data.users);
    await db.disconnect();
    res.status(200).json({ message: 'seeded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error' });
  }
};

export default handler;

// const handler = async (req, res) => {
//   await db.connect();
//   await user.deleteMany();
//   await user.insertMany(data.users);
//   await db.disconnect();
//   res.send({ message: 'seeded successfully' });
// };
// export default handler;
