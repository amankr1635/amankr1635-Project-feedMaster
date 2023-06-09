# Feed-Master

## About Project:-

- The project is focused on MetaTags and ogTags, which provide essential information such as the webpage title and description. This information is displayed as a clickable link in search engine results. Once a user is logged in, they can input a URL, and the application will perform oEmbeding to extract data from the URL and store it in a database for future use.


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
#### /signUp
```ymal
    POST /signUp
```
- Allows users to sign up by creating a new account. Requires the user's name, email,phone, and password to create a new account.
Note:{Strong password required minimum 8 character}

#### /login
```ymal
    POST /login
```
- Allows users to log in to their account. Requires the user's email and password to authenticate the user.

#### /post
```ymal
 POST /post
 ```
- Allows users to create a new post. Requires authentication with a valid token and the post's url.
url is oEmbed by its defined embeded code  or by (open-graph-scraper),it is a npm package for og tags. 

#### /myPosts/:userId
```ymal
 GET /myPosts/:userId
 ```
- Allows users to retrieve their posts by providing their user ID. Requires authentication with a valid token.and in response it gives us an array of object and it gives all post which is created by that particular user.

#### /allPost
```ymal
 GET /allPost
 ```
- Allows users to retrieve all posts that have been created. Does not require authentication.
it response all post which is created by all user of our website 

#### /post/:postId
```ymal
 DELETE /post/:postId
```
- Allows users to delete a post by providing the post ID. Requires authentication with a valid token. and in this authentication and authorization implemented.


### How to run the API
```ymal
To run the API, first, install the required dependencies using the command npm install. After installing the dependencies, start the server using the command npm start.

```
+ The API can be accessed at https://feed-master.onrender.com/.

- Dependencies
The API requires the following dependencies:
```
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
