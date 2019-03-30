
# Env variables:

REACT_APP_CLIENT_ID
REACT_APP_CLIENT_SECRET
REACT_APP_OAUTH_SERVER_URI=https://githubserver.herokuapp.com/authenticate/
REACT_APP_OAUTH_SERVER_LOCAL=http://localhost:9999/authenticate/

Server is deployed to Heroku, and points to the development branch of my fork of the Gatekeeper project:

https://github.com/ahrjarrett/gatekeeper

## Production

### Note on the Github API in Prod

Because we have to tell Github what our callback url is and our domain url, we _have_ to create separate variables / a secondary Github app. Those domains are pointing here:

We have 2 apps deployed between Heroku and Github:

#### Development Environment

| Application Name           | gh-oauth-3-prod                                  |
| Homepage Url               | https://pineneedles.ahrjarrett.com               |
| Authorization callback URL | https://pineneedles.ahrjarrett.com/auth/callback |
| OAuth Server [Prod]        | https://githubserver-prod.herokuapp.com/         |

#### Production Environment

| Application Name           | gh-oauth-3                               |
| Homepage Url               | http://localhost:3000                    |
| Authorization callback URL | http://localhost:3000/auth/callback      |
| OAuth Server [Dev]    | https://githubserver-prod.herokuapp.com/ |


So I created a separate Heroku deployment at `githubserver-prod` that maps to the Github app `gh-oauth-3-prod`.
