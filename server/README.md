<h1 align="center">Welcome to authentication-boilerplate 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/james_r_perkins">
    <img alt="Twitter: james_r_perkins" src="https://img.shields.io/twitter/follow/james_r_perkins.svg?style=social" target="_blank" />
  </a>
</p>

> JWT authentication boilerplate using Mongo and Node

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Needed to run

1. Sendgrid account (free tier is 100 emails a day )
2. Node
3. Mongo
4. Postman or App to link


## How to setup
First go ahead and change these to your email a key of your choice and sendgrid API, email and name.  
  
    APP_SECRET=somekey
    SEND_GRID_EMAIL='EMAIL'
    SEND_GRID_API='API_KEY'
    SEND_GRID_NAME='YOUR NAME OR COMPANY NAME FOR EMAIL'

## API Routes

All routes run through the following 

    /api/auth/
to run register you need to call a post:

    /api/auth/register 
  
    {
      "fullName":"aname",
      "email":"email@email.com",
      "companyName": "name",
      "password": "password"
     }

to run login you need to call a post:

    /api/auth/login 
  
    {
      "email":"email@email.com",
      "password": "password"
     }
     
to run forgot password you need to call a post:

    /api/auth/forgot-password 
  
    {
      "email":"email@email.com",
     }
     
 to run resetPassword you need to call a post:

    /api/auth/reset-password
  
    {
      "password":"newpassword",
      "confirmPassword":"newpassword",
      reset_password_token: "reset_token_from_email"
     }

## Run tests

```sh
npm run test
```

## Author

👤 **James Perkins**

* Twitter: [@james_r_perkins](https://twitter.com/james_r_perkins)
* Github: [@perkinsjr](https://github.com/perkinsjr)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_