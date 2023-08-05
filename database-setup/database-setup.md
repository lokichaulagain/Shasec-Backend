# How to setup Databases

There are three methods:
* Local installation
* Database hosting
* Docker image

I used hosting method. It's free.

### PostgreSQL

* Go to [ElephantSQL.com](https://www.elephantsql.com/)
* Register/Login
* You should be redirected to the [main page](https://customer.elephantsql.com/instance)
* Click on green button Create New Instance button to the right
* Input the form. Name, Plan and Tags.
* For Plan choose Tiny Turtle if you want a *free* instance.
* Click on select Region green button
* Choose region nearest to you
* Once you land on the instances page click on your instance
* It will take you to the details page (Server, Region, CreatedAt...)
* Look for URL. Copy it
* Paste URL in the .env file

```
PGSQL_URI=YOUR-URL
```