# PixelTracker

## Overview

Ever find yourself overspending and not realizing it until the end of the month? Or only having a vague sense of how much you've spent? That's what PixelTracker is focused on preventing, a handy way to track and visualize your expenses!

Pixel Tracker is a web app that will allow users to track their expenses once added. Users can register and login. Once they're logged in, they can add expenses by name and amount, along with categories. For each category, they can visualize expenses at the end of the month, and receive analytics in order to better optimize spending int he future.

## Data Model

The application will store Users and Items

* users can have multiple items (via references)
* each category can have multiple categories (by embedding)

An Example User:

```javascript
{
  username: "shopaholic222",
  hash: // a password hash,
  items: // an array of references to Item documents
}
```

An Example Item:

```javascript
{
  user: // a reference to a User object
  name: "Minecraft", 
  price: "14.99", 
  date: "10/23",
  category: "fun",
  createdAt: // timestamp
}
```

## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/login - page for login

![login](https://github.com/nyu-csci-ua-0467-001-002-spring-2022/final-project-jen-tang/blob/master/documentation/login.png)

/expenses - page for showing all expenses in a list

![expenses](https://github.com/nyu-csci-ua-0467-001-002-spring-2022/final-project-jen-tang/blob/master/documentation/expenses.png)

/expenses/visualizations - page for visualizing expenses over time and by category

![visualization](documentation/visualization.PNG)

## Site map

![Site map](documentation/site-map.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create categories to label my expenses with
4. as a user, I can view all of my expenses in a single list
5. as a user, I can add expenses under each category
6. as a user, I can visualize expenses weekly/monthly in total or by category

## Research Topics

* (2 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * Passport is an authentication middleware for node.js, which can be seamlessly implemented into my express application
    * will probably use passport-http-bearer strategy since it seems popular and can easily be implemented into express
* (1 point) MongoDB Atlas + Heroku
    * I will be deploying on Heroku and connecting MongoDB Atlas
    * Heroku is service for containerized application deploy and MongoDB Atlas is MongoDB's cloud database offering
* (1 point) Moment.js
    * Moment.js is a JavaScript date library for parsing, validating, manipulating, and formatting dates
    * I am using Moment.js for parsing and converting dates stored in MongoDB to human readable format
    * Only used for a very small portion of project, so I've assigned it simply 1 point
* (5 points) d3.js
    * I will use d3.js to visualize expense data
    * d3 is a javascript library for visualizing data using web standards, so it's a great way to make data look readable and visually appealing
    * will use d3.js with observable, since it seems like the most popular method
    * d3 is a challenging library so I've assigned it 5 points, although subject to change

9 points total out of 8 required points.

## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [passport.js authentication docs](http://passportjs.org/docs)
2. [introduction to d3.js](https://observablehq.com/@d3/learn-d3)

