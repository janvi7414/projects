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
- 








