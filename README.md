# Feed-Master

- About Project:-

 Project is about MetaTags and ogTags. 


### Models
- UserModel
```
{name:{mandatory},email:{mandatory,unique},
phone:{mandatory,unique},
password:{mandatory}}
```
- PostModel
```

{
    userId:{refrence to userModel},
    
    for oEmbed
    {title:String,url:String,
    author_name:String,
    author_url:String,
    type:String,
    height:String,
    width:String,
    version:String,
    provider_name:String,
    html:String}
    for ogTag{
        ogTitle:String,
        requestUrl:String,ogDescription:String,
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
}

```

- Endpoints

### POST /signUp
Allows users to sign up by creating a new account. Requires the user's name, email,phone, and password to create a new account.
Note:{Strong password required}

### POST /login
Allows users to log in to their account. Requires the user's email and password to authenticate the user.

### POST /post
Allows users to create a new post. Requires authentication with a valid token and the post's url.
url is oEmbed by its defined embeded code  or by (open-graph-scraper),it is a npm package for og tags. 

### GET /myPosts/:userId
Allows users to retrieve their posts by providing their user ID. Requires authentication with a valid token.and in response it gives us an array of object and it gives all post which is created by that particular user.

### GET /allPost
Allows users to retrieve all posts that have been created. Does not require authentication.
it response all post which is created by all user of our website 

### DELETE /post/:postId
Allows users to delete a post by providing the post ID. Requires authentication with a valid token. and in this authentication and authorization implemented.

### Middleware
- authentication
Middleware function that verifies the user's token to ensure that the user is authenticated before accessing protected routes.

### Controllers
- userController.js
Contains functions to handle user-related operations like creating a new user and authenticating a user during login.

- postController.js
Contains functions to handle post-related operations like creating a new post, retrieving user posts, retrieving all posts, and deleting a post.

- How to run the API
To run the API, first, install the required dependencies using the command npm install. After installing the dependencies, start the server using the command npm start.

+ The API can be accessed at http://localhost:3001/.

- Dependencies
The API requires the following dependencies:

+ Express.js
+ Body-parser
+ axios
+ bcrypt
+ cors
+ dotenv
+ jsonwebtoken
+ mongoose
+ nodemon
+ open-graph-scraper

## Response

- userCreation
```
{
"status": true,
    "message": "Sucessfully SignedUp",
    "data": {
        "name": "test User",
        "email": "test@gmail.com",
        "phone": "9976793005",
        "password": "$2b$12$L1PQmMUpe0WrAiFqFIUwRONG5ipNIl2Q8vf9k8Xqe0jLbnMpYkiMq",
        "_id": "6439109f75c05027e2211ef8",
        "createdAt": "2023-04-14T08:36:47.273Z",
        "updatedAt": "2023-04-14T08:36:47.273Z",
        "__v": 0
    }
}
```
- Post Creation
```
{
    "status": true,
    "message": "postCreated",
    "data": {
        "userId": "6439109f75c05027e2211ef8",
        "title": "Register and Login Page Tutorial | ReactJs, NodeJS, MySQL (Beginner)",
        "url": "https://youtu.be/W-sZo6Gtx_E",
        "author_name": "PedroTech",
        "author_url": "https://www.youtube.com/@PedroTechnologies",
        "type": "video",
        "height": "113",
        "width": "200",
        "version": "1.0",
        "provider_name": "YouTube",
        "html": "<iframe width=\"200\" height=\"113\" src=\"https://www.youtube.com/embed/W-sZo6Gtx_E?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen title=\"Register and Login Page Tutorial | ReactJs, NodeJS, MySQL (Beginner)\"></iframe>",
        "isDeleted": false,
        "_id": "643910f175c05027e2211efa",
        "createdAt": "2023-04-14T08:38:09.188Z",
        "updatedAt": "2023-04-14T08:38:09.188Z",
        "__v": 0
    }
    
}
```
