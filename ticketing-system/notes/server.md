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
- 

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








