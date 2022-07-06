CREATE TABLE users (
  _id serial PRIMARY KEY,
  _username varchar(255) NOT NULL,
  _email varchar(255) NOT NULL,
  _password varchar(255) NOT NULL,
  _role varchar(255) NOT NULL DEFAULT 'Reader',
  _created_at timestamp NOT NULL DEFAULT now(),
  _updated_at timestamp NOT NULL DEFAULT now()
);

DROP TABLE users;

INSERT INTO users(_username, _email, _password, _role)
VALUES('Test1', 'test1@mail.com', 'Admin123*', 'Reader');

SELECT * FROM users;