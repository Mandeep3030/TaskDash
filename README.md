# Instructions for Professor from Ashley:

To ensure you are able to run it, here is some basic usage guidelines.

Katrina's Mongoose configuration looks for a MongoDB database called "tasksdash", which has the `employees` and `tasks` collections
MongoDB is explicitly checked for as running under the default port, directly accessing the `tasksdash` endpoint.
The connection string is `mongodb://127.0.0.1:27017/tasksdash`, as we aren't using MongoDB's user system, it is a plain, direct connection using default settings.

node_modules aren't included like in your MERN skeleton, so ensure you run `npm install` as always.

I have done all of my testing on my Debian machine, so there may be incompatibilities with paths on your local machine.

The `npm run start` command is what is used over the typical `npm run dev`. That run target uses `nodemon` for later use,
but it's not fully configured as this is a backend prototype not designed for concurrent use with a React frontend yet.

To sign in, the auth endpoints are /auth/signup, /auth/signin, and /auth/signout.

Here are some useful commands to prepare a local account to start testing our APIs.

SIGNUP:
`curl -X POST localhost:4000/auth/signup -H "Content-Type: application/json" -d '{"email": "admin@company.com", "password": "admin123", "employeeId": "admin123", "name": "Admin"}' | python -m json.tool`

SIGNIN:
`curl -X POST localhost:4000/auth/signin -H "Content-Type: application/json" -d '{"email": "admin@company.com", "password": "admin123"}' | python -m json.tool`

Some sample data will be available in the `mongo/` directory to import into your `tasksdash` DB. Please note the typo, but it is too late to change as that is what is on every one's end.

Thank you.

# Object IDs for Sample Accounts

To set task assigners/assignees:

Admin: 6917919fafe03f455106734c
Manager: 6917aa90c2a32ef3517e7dbe
Employee: 6917aacfc2a32ef3517e7dc0