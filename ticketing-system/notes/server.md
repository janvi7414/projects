- server/models/Ticket.js 
    {timestamps: true} this adds fields createdAt and updatedAt 

- server/controllers/ticketController.js
    why exports.createTicket  this allows other files to use these functions in this file

    "201" for successful creation

- Any IP address can make a request to your server But only your server can make a request to the database Your server does NOT blindly accept everything.
It checks:
    Login (username/password)
    JWT token
    Role (user, admin)
    Rate limits
    Validation
- In production, the backend runs on a stable server with a fixed IP, which is whitelisted once in MongoDB Atlas. The database remains continuously accessible, so the server automatically connects at startup without manual intervention. The IP issue is only common during local development.
- 


# User.js
- trim: true to avoid unnecessary spaces in name
- match: /.+\@.+\..+/ to reject invalid emails
- select: false to not show it when User.find() User.findById() on body thus to keep password safe
- timestraps: true to use bydefault createdAt, updatedAt time
- pre("save") mongoose middleware hook runs automatically before a doc is saved to mongodb 
- "this" is used to point to the current user document(row in database called document) 
- isModified("password")  checks if password new or changed this is to prevent double hashing of the same password
- const salt = await bcrypt.genSalt(10); here random string is added before hasing to prevent rainbow table attacks and hash reuse attacks. 10 rounds 
- Ensures only hashed value is stored Original password is never saved anywhere
- next() is a func tells mongoose that middleware is finished continue saving document if next is forgetten it hangs the request and save operation is never completed. we are not using simple return here as return only exits the func
- (next) => { ... } we didnot use arrow func as this has no "this"
- to compare the password we are hashing the password entered and then comparing with the hashed actual password 
- hashing is done in model and not in controller for security purpose
- bcrypt is used for hashing
- userSchema.methods here methods are functions attached to a document like comparePassword()
- salt it is a random data added to every password uniquly before hashing without has same password will be converted into same hash. we can use any keyword instead of salt but it is a cryptographic concept ant this is professional term
- hash string consists of algo, salt rounds, salt, hashed password
- Rounds = how many times the hashing algorithm is applied.
    1. Generate cryptographically secure random salt
    2. Combine salt + password
    3. Apply hashing algorithm (10 rounds)
    4. Output final hash
- During authentication, the system identifies the user by their unique email, retrieves that user’s stored bcrypt hash, extracts the embedded salt and rounds, and then compares the entered password against that hash got after adding salt and rounds on the entered password. Also even hacker can read rounds and salt but as bcrypt is one way hacker will have to make millions of guesses to apply salt and rounds on to get the password
- Mongoose is an ODM (Object Data Modeling) library for MongoDB + Node.js.
 Why Mongoose is used:
    Schema → structure for data
    Model → interface to interact with DB
    Validation → data correctness
    Middleware (hooks) → logic before/after DB actions
    Methods & statics → reusable logic
    Relationships → references between collections

## generateToken.js
- "jsonwebtoken" it is an external library used to create and verify jwts
- jwt is an object containing methods like jwt.sign(), jwt.verify()
- "stateless" this is a primary API's architecture which uses JSON Web Token (JWT) for authentication instead of server side sessions. server doesnot save any data of user instead jwt has all the data but not sensitive info needed thus even if server fails user's session is not lost
- when user registers or logs in if the user is valid (entery is created in DB) or the username and password matches this is termed as authentication done then JWT is generated and is sent to the client back. Frontend stores this in localstorage this is used by backend rather backend checks the data from jwt every time if the expiry is valid with other details for further authorization.
- Flow:
    User registers
    Password is hashed and stored
    User logs in
    Authentication happens
    JWT generated with userId
    JWT stored on client
    Client sends JWT in Authorization header
    Backend verifies signature + expiry
    Authorization checks role/permissions
- encode = used to format the data and not for security as it can be decoded back
- encryption = this is uses a secret key and is reversible this is not used for password either
- hashing = this is one way and is used for security of password
- jwt has 3 parts (header, payload, signiture) signiture = token authenticity check
- jwt is stored by frontend and session is stored in backend thus is easy to revok
-   jwt.sign() to create token 
    jwt.verify() to verify
- "const generateToken = (user) => {
  if (!user || !user._id || !user.role) {
    throw new Error("Invalid user data for token generation");
  }" here func to generate token for a user where user is an obj from db if cond is used to prevent token genration for user missing any of these values
  - 7d = 7 days
  - jwt adds iat (issued at time) and exp (validate till) uses unix time i.e. seconds since 1 Jan 1970 (UTC) 
  - jwt.sign(payload, secret, exp) here
  - short expiry time is used so that hacker does not get enough time to hack, random JWT_SECRET is a cryptographic key used to sign and verify jwt this is to check if the token is generated by our server else any other server can also create a valid token
  - User.select(
      "+password"
    ); 
        it is used to change the setting for DB that password is set select: false to prevent it form passing in jwt but to compare password we need it thus we are settig it as select: true to comapre the true password which is still hashed and entered password it is just fetched and not sent in jwt
  - TL;DR = Too Long Didn't Read
  - 


  ## Common types of Error codes
  - HTTP Status Codes (Web/APIs): Used by web servers, categorized by range.
    1xx (Informational): Request received, processing.
    2xx (Success): 200 OK (Success).
    3xx (Redirection): 301 Moved Permanently, 302 Found.
    4xx (Client Error): 400 Bad Request, 401 Unauthorized, 404 Not Found, 403 Forbidden, 409 Conflict, 429 Too Many Requests.
    5xx (Server Error): 500 Internal Server Error, 503 Service Unavailable.
- Https Response Status Codes 1xx Series
    100 Continuous
    101 Change of protocol
    102 Processing
    Https Response Status Codes 2xx Series – Success
    200 OK
    201 Created
    202 Accepted
    203 Secondary source information
    204 No content
    205 Content Reset
    206 Partial Reset
    207 Multistate
    Https Response Status Codes 3xx Series – Redirect
    300 Multiple Choices
    301 Moved permanently
    302 found
    303 See elsewhere
    304 Unmodified
    305 Use proxy
    306 Change proxy
    307 Temporary redirect
    HTTP status codes 4хх Series – Web client error
    400 bad request
    401 Unauthorized
    402 Payment required
    403 Forbidden
    404 error page not found
    405 Unauthorized method
    406 Unacceptable
    407 Proxy authentication required
    408 Request timed out
    409 Conflict
    410 Disappeared
    411 Mandatory length
    412 Precondition failed
    413 Request entity too long
    414 Request URL too long
    415 Unsupported media type
    416 Requested interval not available
    417 Expected behavior failed
    418 I’m a teapot
    422 Entity cannot be processed
    423 Locked
    424 Failed dependencies
    425 Unordered collection
    426 Update needed
    428 Necessary precondition
    429 Too many requests
    431 Request header fields too long
    444 No response
    449 Retry with (Microsoft)
    450 Blocked by Windows Parental Controls (Microsoft)
    451 Unavailable for legal reasons
    HTTP status code class 5xx series – server error
    500 Internal server error
    501 Not implemented
    502 Bad Gateway
    503 Server not available
    504 Gateway timeout expired
    505 Unsupported version of HTTP
    506 Variant also trades
    507 Insufficient storage
    509 Bandwidth limit exceeded
    510 No extension
    511 Network authentication required
- 



## authMiddleware.js
- " if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) "
    here first we are checking if header is missing and second checks if header is in correct formate i.e "Authorization: Bearer asdfdfdf" 
- Bearer = the one who holds the token 
- Authorization: <scheme> <credentials>
  is standard HTTP header format used to send token to the server 
- When a client (browser / app) talks to a server, every request and response has 3 parts:
    1. Start line
    2. Headers
    3. Body (optional)
e.g.
    GET /api/tickets HTTP/1.1
    Host: example.com
    Authorization: Bearer abc123
    Content-Type: application/json
    User-Agent: Chrome/143
header = key-value pairs that carries metadata i.e. extra info about the request and response they describes how to handle the data. This helps middleware to read easily
    header = instruction + identity + rule
- common header are:
    Authorization = who is making the req
    Content-Type = format of the body (JSON, form, etc)
    Accept = what res format client wants
    User-Agent = client details (browser,app)
    Cookie = session info
    Cache-Control = caching rules
- schemes for Authorization
    Basic = username: password sent in every req
    Bearer = token proves id and token has expiry
    Digest = uses hashing+nonce
    ApiKey = no user specific permissions
    cookie = server stores session browser sends cookie automatically
    OAuth 2.0 = login via google/github

- Tampering = illegally modifying data to gain unauthorized access 
- .startsWith() to check if string starts with "Bearer"
- .split(" ")[1]; to split stirng by spaces from index 1 as "Bearer" is at index 0
- "    const user = await User.findById(decoded.id).select("-password");" here We attach authenticated user context to the request so all next middleware and controllers can use it without re-verifying the token or querying the DB again.
- "const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Insufficient permissions" });
    }
    next();
  };
};"
    here "..." is called rest operator i.e. it collects all passed arguments into one variable as an array here in array named allowedRoles e.g. allowedRoles = ["admin", "manager", "support"]. authorize is a higher order func i.e. it returns another func 



## db
-   server.js = application entry point
    DB must connect before server starts listening
    app.js should stay reusable (for testing, serverless, etc.)
- why did we use app.js and server.js separetely To separate Express configuration from server startup logic, which improves testability, scalability, and maintainability without opening the port.
- db connection is async
- 


## server.js
- "dotenv" reads environment variables from a .env file
- .config() Loads variables into process.envMakes values like process.env.PORT, process.env.MONGO_URI available
- app.listen() starts accepting incoming req
-   What errors can occur here
    MongoDB unreachable
    Invalid connection string
    Authentication failure
    Network error
- process.exit(1) immediately terminates Node.js process
- silent crash = app fails and error is unknown
- startServer() is not exported as module.exports as this is the not reused in other file but is executed directly at entry point
- require ("express") Imports the Express framework
Express is responsible for:
    creating server
    routing
    middleware handling
    request/response lifecycle (GET, POST, PUT. DELETE)
- app.use(express.json()) For every incoming HTTP request, if the request body is JSON, parse it and make it available as req.body. use() registers middleware. express.json() is a built-in middleware func 
- JSON (Javascript Object Notation) = It is a text-based data format used to send andreceive data between:frontend ↔ backend, backend ↔ backend, APIs ↔ clients It is language-independent, even though it looks like JavaScript. Supported everywhere (JS, Java, Python, Go, etc.)
- Rules of JSON
    Keys must be in double quotes
    Values can be:
        string
        number
        boolean
        array
        object
        null
        ❌ No functions
        ❌ No comments
- Parsing = converting raw text into a structured, usable format
- flow:
    express checks req headers and searched for Content-Type: application/json
    if found reads raw req stream and converts this JSON into js object and attaches this to req.body
    implements next middleware/route
- .use() applies to all HTTP methods
.get() only applies to GET
.post() only applies to POST 
- router.use() applies middleware to all the routes inside the router
- express.json() does not parse form-data, multipart uploads, url-encoded data for these we need "app.use(express.urlencoded({ extended: true }));". for image and large payloads we use limit as "app.use(express.json({ limit: "10mb" }));"
- const PORT = process.env.PORT || 5000; works locally as well as in cloud assigned port



## app.js
- app represents entire backend's server
- cors = cross Origin resource sharing. browser blocks req between different origins by default this middleware tells browserr to allow req from provided origin.
- A router decides what code should run when a specific API URL is requested. Express provides routers by default, and we can create multiple routers for different purposes, such as features or user roles. By using routers along with middleware, we can allow or restrict access to certain routes so that users can only access the routes meant for their role.
- app.use("/tickets", ticketRoutes); Any request whose URL starts with /tickets will be handled by ticketRoutes.

## ticketRoutes.js
- "const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");" here we are importing multiple logic functions form ticketcontroller.js
- "router.route("/")
  .get(getTickets)
  .post(createTicket)"
  here router.route() it groups multiple HTTP methods for the same URL rather than writing separate router.get("/") and router.post("/")
  - 


  ## ticketController.js
  - "Ticket.find().sort({ createdAt: -1 })" to fetch all ticket documents form MongoDB in latest first descending order
  - Object.assign() = Copies values from req.body to ticket, Updates only provided fields
  - Controllers contain business logic. They receive requests from routes, interact with the database using models, handle validations, and send appropriate HTTP responses.




