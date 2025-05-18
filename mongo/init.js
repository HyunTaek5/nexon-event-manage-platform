db = db.getSiblingDB('devdb');

db.createCollection('users');
db.users.insertMany([
  {
    email: 'admin@example.com',
    password: '$2b$10$BqiQueX921m3MSlZ7SIrC.kO51bbjUZJHBAnSbqFCBxNdG.j7gSvm',
    firstName: '넥슨',
    lastName: '김',
    nickname: '관리자1',
    role: 'ADMIN',
  },
  {
    email: 'user1@example.com',
    password: '$2b$10$IzrWrt3m8PrjaIVAoy6TiehKBVwMj6DsQqx/DpBAUAAD9YYkSeT.e',
    firstName: '넥슨',
    lastName: '이',
    nickname: '유저1',
    role: 'USER',
  },
  {
    email: 'op1@example.com',
    password: '$2b$10$BqiQueX921m3MSlZ7SIrC.kO51bbjUZJHBAnSbqFCBxNdG.j7gSvm',
    firstName: '넥슨',
    lastName: '박',
    nickname: '운영자1',
    role: 'OPERATOR',
  },
  {
    email: 'audit1@example.com',
    password: '$2b$10$IzrWrt3m8PrjaIVAoy6TiehKBVwMj6DsQqx/DpBAUAAD9YYkSeT.e',
    firstName: '넥슨',
    lastName: '오',
    nickname: '감사자1',
    role: 'AUDITOR',
  },
]);

db.createUser({
  user: 'user1',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'devdb',
    },
  ],
});
