# How to setup the task app
It is required to have a PostgreSQL server running on your machine to be able to start this app.
Ruby 2.6.5 is preferred.

1. Run bundle install

2. Create a .env file with the following env variables: TASKAPP_DATABASE_PASSWORD, POSTGRES_PORT

3. Run bundle exec rake db:create

4. Run bundle exec rake db:migrate

5. Run bundle exec rake db:seed

6. Start the app with rails s command

