db = db.getSiblingDB('devdb');

db.createCollection('migrations');
db.migrations.insertMany([{ initialized: true }]);

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
