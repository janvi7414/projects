commands:

    -mkdir server
    -cd server
    -npm init -y

        //edits in package.json in server
            "scripts": {
                "start": "node src/server.js",
                "dev": "nodemon src/server.js"
            }

    -npm install express mongoose cors dotenv
    -npm install --save-dev nodemon

    -mkdir src
    -cd src
    -mkdir config models controllers routes middlewares utils
    -cd ..




Browsers enforce CORS (Cross-Origin Resource Sharing)
CORS = building a door between two buildings it allows browser-based clients from different origins to access API securly and it is a runtime dependency


You install nodemon with --save-dev because:Nodemon is only needed during development, not when your app is running in production.

Nodemon = having an automatic light switch it automatically restarts the server when there is any change in code it is devDependency

in .env 
    NODE_ENV=development → You are building & debugging

    NODE_ENV=production → App is live

    Never deploy with NODE_ENV=development


--- client/----

-npm create vite@latest client
-cd client
-npm install axios react-router-dom
# for UI
-npm install @mui/material @emotion/react @emotion/styled
-npm install @mui/icons-material
-npm install -D tailwindcss postcss autoprefixer
-npx tailwindcss init -p


