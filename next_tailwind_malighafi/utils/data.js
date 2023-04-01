import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
      description: 'high quality product',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Nike',
      rating: 4.2,
      numReviews: 5,
      countInStock: 6,
      description: 'high quality product',
    },
    {
      name: 'Best Pants',
      slug: 'best-pants',
      category: 'Pants',
      image: '/images/pants1.jpg',
      price: 120,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 6,
      description: 'high quality product',
    },
    {
      name: 'Fit Pants',
      slug: 'fit-pants',
      category: 'Pants',
      image: '/images/pants2.jpg',
      price: 120,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 6,
      description: 'high quality product',
    },
  ],
};

export default data;
