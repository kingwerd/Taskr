CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR (75) NOT NULL,
	last_name VARCHAR (75) NOT NULL,
	email VARCHAR (300) UNIQUE NOT NULL,
	user_name VARCHAR (100) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP
);

CREATE TABLE categories(
	id SERIAL PRIMARY KEY,
	title VARCHAR (100) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP
);

CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	title VARCHAR (300) NOT NULL,
	description TEXT NOT NULL,
	points INTEGER NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
	-- foreign keys
	user_id INTEGER REFERENCES users (id), -- this is the creator of the task
	category_id INTEGER REFERENCES categories (id),
	-- min max check for points
	CHECK (points > 0 AND points <= 10)
);

-- create owners table
-- these are the users who are working on the task
CREATE TABLE owners(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
	-- foreign keys
	user_id INTEGER REFERENCES users (id), -- user who will be completing the task
	task_id INTEGER REFERENCES tasks (id) -- the task that the user will be completing
);

-- create task comments table
CREATE TABLE task_comments(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
	-- foreign keys
	user_id INTEGER REFERENCES users (id), -- the user who created the comment
	task_id INTEGER REFERENCES tasks (id)
);

-- create checklist table
-- sub tasks that need to be completed within larger task
CREATE TABLE checklists(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
	--foreign keys
	task_id INTEGER REFERENCES tasks (id)
);

-- create checklist item table
CREATE TABLE checklist_items(
	id SERIAL PRIMARY KEY,
	title VARCHAR (255) NOT NULL,
	completed BOOLEAN DEFAULT false,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
	-- foreign keys
	user_id INTEGER REFERENCES users (id), -- the user who created the item
	checklist_id INTEGER REFERENCES checklists (id)
);