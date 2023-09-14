## Project Name : MTM Tradus (Inventory Management)

#Live site Link :

## Using Technologies :

ExpressJS, Mongoose, MongoDB, TypeScript, JWT, etc.

## Challenging Features:

Pagination, Filtering, JTW Token Verify, auth service, Transaction & callback, Zod Validation, Global Error Handler, Instance Methods, Password Hashing, Password Compare, Authentication, and Carefully using typeScript etc.

## USER ENPOINT : (crud operation)

### Create User :

- When we will create user. such as if your password & confirmPassword is not equal so i can not create user.
- when we will see user response, Password does not show . i showed all of data without password

### GetAllUsers / Filters

- you can filtering all of users.
- you can searching all of users.
- you can pagination all of users.
- you will be able to show all of users without password
- (Authentication): it could access only Admins.

### Update User

- you can update your profile(userData).
- if The user is not exist , so i won't update your userData.
- you will be able to show all of users without password
- (Authentication): It could access only Admins & Yourself.

## AUTH ENPOINT :

### User Login :

- I have used (bcrypt, JWT-token, Instance-Methods, isUserExist, Password-Compare, Create-accessToken, Create-refreshToken)

### refresh-token User :

----i have tried various Special Features :-----

- Token Verification
- Get Token From Cookies
- Set Token into Cookies
- New AccessToken
- using Zod Validation for Refresh Token.
- when The users finish expireTime , so The users have to use refresh-token route for new accessToken.
  end .

Change User Password :

- Authentication access (if you are not a admin or user so you won't be able to password-change.)
- after finishing token verify we can get user information(userEmail, role).
- i have compared oldPassword and newPassword. i have use bcrypt for compare password.
