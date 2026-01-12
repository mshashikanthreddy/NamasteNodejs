# Dev-Tinder API's

## authRouters

- POST/signup
- POST/login
- POST/logout

## profileRouter

- POST/profile/view
- PATCH/profile/edit
- PATCH/profile/password

## connectionRequestRouter

- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:userId
- POST/request/review/rejected/:userId

## userRouter

- GET/user/feed
- GET/user/connections
- GET/user/requests

Status :  interested , ignored , accepted , rejected .
