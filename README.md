# steps to run the project
1. CREATE a .env file on root folder and COPY the content from .env.example
2. CREATE a database named chatbot-server in your postgres server
3. UPDATE database host, port number, username and password in the .env file
4. RUN npm install to install all dependencies 
5. RUN npm run start:dev to start the server
6. RUN npm run migration:run to create the database tables
7. RUN npm run seeder:run:dev to insert data into the database

# commands
## chatbot-server
npm run start:dev
## create a new migration in current folder
npm run migration:create -n name_of_migration
## create a new migration inside specific migration folder
npm run migration:create -n name_of_migration_with_absolute_path
npm run migration:create -n src/database/migrations/create_user_table
## to migrate
npm run migration:run
npm run migration:run --schema=schemaName
## to rollback last migration
npm run migration:rollback --schema=schemaName
## to run the seeder
npm run seeder:run:dev
## create a new entity in current folder
npm run entity:create name_of_entity
## create a new entity inside specific entity folder
npm run entity:create name_of_entity_with_absolute_path
## to receive notification inside browser during development keep this command running
npx notification-catcher
## to open swagger ui run
localhost:port_number/api