Build the following:

* create a table "bottles". Each item has:
    * a brand
    * a price
    * a volume
    * an count of bottle

* create a table "users". Each user has:
    * a name
    * a role (user/admin)
    * a password

The following routes
* GET /login (returns a token), AUTH: Basic HTTP auth
* GET /bottles return all bottles AUTH: No Auth
* GET /bottles/id return a bottles AUTH: No Auth
* POST /bottles add a bottles AUTH: admin only
* UPDATE /bottles/id used to change the count of a bottles AUTH: all logged in users
* DELETE /bottles used to remove a bottles AUTH: admin only