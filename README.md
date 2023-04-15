# Feed-Master

## About Project:-

- Project is about MetaTags and ogTags.Meta tag and ogTag provides the title,description of the webpage and appears in search engine results as the clickable link.


### Models
- UserModel
```yaml
{
    name:{mandatory},
    email:{mandatory,unique},
    phone:{mandatory,unique},
    password:{mandatory}
}
```
- PostModel
```yaml

{
     userId : {
      type:mongoose.Schema.Types.ObjectId,
      ref: "userData"
    },
    title: String,
    url:String,
    author_name: String,
    author_url: String,
    type:String,
    height:String,
    width:String,
    version:String,
    provider_name: String,
    html : String,
    ogTitle:String,
    requestUrl:String,
    ogDescription:String,
    ogUrl:String,
    ogImage:{
      type:{
        type:String
      },
      url:String
    },
    isDeleted:{
      type:Boolean,
      default: false
    }
}

```

## Endpoints
#### signUp
```http
    POST /signUp
```
- Allows users to sign up by creating a new account. Requires the user's name, email,phone, and password to create a new account.
Note:{Strong password required minimum 8 character}

#### /login
```http
    POST /login
```
- Allows users to log in to their account. Requires the user's email and password to authenticate the user.

#### /post
```http
 POST /post
 ```
- Allows users to create a new post. Requires authentication with a valid token and the post's url.
url is oEmbed by its defined embeded code  or by (open-graph-scraper),it is a npm package for og tags. 

#### /myPosts/:userId
```http
 GET /myPosts/:userId
 ```
- Allows users to retrieve their posts by providing their user ID. Requires authentication with a valid token.and in response it gives us an array of object and it gives all post which is created by that particular user.

#### /allPost
```http
 GET /allPost
 ```
- Allows users to retrieve all posts that have been created. Does not require authentication.
it response all post which is created by all user of our website 

#### /post/:postId
```http
 DELETE /post/:postId
```
- Allows users to delete a post by providing the post ID. Requires authentication with a valid token. and in this authentication and authorization implemented.


### How to run the API
```http
To run the API, first, install the required dependencies using the command npm install. After installing the dependencies, start the server using the command npm start.

```
+ The API can be accessed at http://localhost:3001/.

- Dependencies
The API requires the following dependencies:
```http
- Express.js
- Body-parser
- axios
- bcrypt
- cors
- dotenv
- jsonwebtoken
- mongoose
- nodemon
- open-graph-scraper
```
### variables
- mongo_Url
- port