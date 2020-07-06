# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Task.create([
    {name: 'Create Rails App with slim template engine', scheduled_at: Time.new + rand(1..30).days },
    {name: 'Set up SQL database with necessary migrations - PostgreSQL / MySQL', scheduled_at: Time.new + rand(1..30).days },
    {name: 'Implement React calendar date picker npm pack', scheduled_at: Time.new + rand(1..30).days },
    {name: 'By selecting the date user can provide a task for that date', scheduled_at: Time.new + rand(1..30).days },
    {name: 'After submitting the task - all tasks are being listed next to the calendar', scheduled_at: Time.new + rand(1..30).days },
    {name: 'Tasks can be deleted, edited - CRUD', scheduled_at: Time.new + rand(1..30).days },
    {name: 'Design should be either bootstrap or material based without any unnecessary customisations.', scheduled_at: Time.new + rand(1..30).days }
])