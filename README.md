
# Env variables:

REACT_APP_CLIENT_ID
REACT_APP_CLIENT_SECRET
REACT_APP_OAUTH_SERVER_PROD=https://githubserver-prod.herokuapp.com/authenticate/
REACT_APP_OAUTH_SERVER_DEV=https://githubserver.herokuapp.com/authenticate/
REACT_APP_OAUTH_SERVER_LOCAL=http://localhost:9999/authenticate/

Server is deployed to Heroku, and points to the development branch of my fork of the Gatekeeper project:

https://github.com/ahrjarrett/gatekeeper

## Production

### Note on the Github API in Prod

Because we have to tell Github what our callback url is and our domain url, we _have_ to create separate variables / a secondary Github app. Those domains are pointing here:

We have 2 apps deployed between Heroku and Github:

#### Production Environment

| Application Name           | gh-oauth-3-prod                                  |
| Client Id                  | 1eb01 ... 03/30/19                                |
| Client Secret              | 4c6d1 ... 03/30/19                                |
| Homepage Url               | https://pineneedles.ahrjarrett.com               |
| Authorization callback URL | https://pineneedles.ahrjarrett.com/auth/callback |
| OAuth Server [Prod]        | https://githubserver-prod.herokuapp.com/         |

#### Development Environment

| Application Name           | gh-oauth-3                               |
| Client Id                  | 0feaf ... 03/30/19                       |
| Client Secret              | 36755 ... 03/30/19                       |
| Homepage Url               | http://localhost:3000                    |
| Authorization callback URL | http://localhost:3000/auth/callback      |
| OAuth Server [Dev]         | https://githubserver.herokuapp.com/ |


So I created a separate Heroku deployment at `githubserver-prod` that maps to the Github app `gh-oauth-3-prod`.
