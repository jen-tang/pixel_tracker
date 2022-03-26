# PixelTracker

## Overview

Ever find yourself overspending and not realizing it until the end of the month? Or only having a vague sense of how much you've spent? That's what PixelTracker is focused on preventing, a handy way to track and visualize your expenses!

Pixel Tracker is a web app that will allow users to track their expenses once added. Users can register and login. Once they're logged in, they can add expenses by name and amount, along with categories. For each category, they can visualize expenses at the end of the month, and receive analytics in order to better optimize spending int he future.

## Data Model

The application will store Users, Categories, and Items

* users can have multiple categories (via references)
* each category can have multiple items (by embedding)

An Example User:

```javascript
{
  username: "shopaholic222",
  hash: // a password hash,
  categories: // an array of references to Category documents
}
```

An Example Category with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "fun",
  items: [
    { name: "Minecraft", price: "14.99"},
    { name: "Batman Ticket", price: "12.99"},
  ],
  createdAt: // timestamp
}
```

## [Link to Commented First Draft Schema](db.js) 

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create categories to label my expenses with
4. as a user, I can view all of my expenses in a single list
5. as a user, I can add expenses under each category
6. as a user, I can visualize expenses weekly/monthly in total or by category

## Research Topics

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

