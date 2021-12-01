CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id SERIAL NOT NULL REFERENCES users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
);

SELECT diesel_manage_updated_at('profiles');
