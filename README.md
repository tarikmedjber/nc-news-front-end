## Northcoders News

> ALERT! Please **create your own repo** for NC News to avoid later issues with deploying and git histories.

Northcoders News is a social news aggregation, web content rating, and discussion website. Think something along the lines of [Reddit](https://www.reddit.com/).

Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

This review sprint should consolidate your understanding of making a [C.R.U.D](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) application from a front end perspective.

### Objectives

1. Pull together all the front-end skills, technologies and best practises you have learnt.
2. Make asynchronous API calls to your own server.
3. Use HTTP request types to interact with your backend, and HTTP response codes to update your UI accordingly.

### What to do

Use the generic react-project-checklist as a guide to setting up your app. Here are some project-specific things to bear in mind:

1. Have a look at your API endpoints and at Reddit. Think about what data you have available, and how you will structure your application. What routes will your application have? What articles will you choose to display on the main page?

2. Think how you will isolate the concerns of your project - the structure of your components, the sourcing of your data, the styling.

3. What sort of routing does Reddit use? What sort of specificity do you think you will need? Remember, your urls don't have to directly correspond to your api endpoints, but they will provide some guidance.

4. Think about what data each component will need. Where will it come from? When should components find their own data and when should they load it themselves? Focus on loading a list of articles for your front page first of all.

5. Consider more complex functionality: how do you want to allow changes to your database? Think about how you will attribute users to posted comments etc. How will you know what comments/articles a user should be allowed to delete? How about sorting data, or paginating responses? A good starting point would be to pick a single user and assuming that all new articles and comments are being posted by that user.

6. How are you going to make this a fluid and engaging experience for users, so they want to come back for more?

_Note: You will come across a Cross-Origin-Resource-Sharing error once you start fetching data from your back-end API, which will need a slight update: [Express CORS Middleware](https://expressjs.com/en/resources/middleware/cors.html)_

### 'Must Have' User Stories

You should implement the following functionality in your website. Check the lecture calendar to see when any new topics will be covered, but feel free to have a go at them beforehand as well!

**As a user, I should be able to...**

<!-- 1. view a list of all articles -->

<!-- 2. view a page for each topic with a list of related articles. -->
   <!-- 3. view an individual article. -->

<!-- 3. view an individual article's comments. -->

<!-- 4. log-in to the site. -->

<!-- 5. sort articles by:
   - date created
   - comment_count
   - votes -->

**As a logged-in user, I should be able to...**

<!-- 7. log out. -->

<!-- 8. post a new comment to an existing article. -->

<!-- 9. delete my own comments. -->

10. vote on an article and immediately see the change.
11. vote on a comment and immediately see the change.

**As a hiring partner, I should be able to...**

12. use the site on my mobile without sacrificing style or functionality (as I may not have my laptop nearby).
13. log-in clearly with a suggested or default user (as I have no knowledge of the users in the database)
14. follow the readme instructions to easily run the project locally.
15. find a link to the hosted version of the project in the readme.
16. find a link to the back-end repository of the project in the readme.
17. find a link to the hosted version of the back-end project in the readme.

**Error-handling: As a user, I should...**

18. be directed to a 404 page if I go on a non-existent path/a path for a non-existent article
19. not be allowed to post an article if I have not filled in all of the form boxes.
20. not be able to log in with a non-existent username.

### _If time, and if you have implemented it in your back-end API..._

**As a user, I should be able to...**

21. navigate over pages of articles (e.g. using pagination or infinite scroll).
22. navigate over pages of comments (e.g. using pagination or infinite scroll).
23. view a list of all articles written by a specific user.

**As a logged-in user, I should be able to...**

24. post a new article to an existing topic.
25. delete my own articles.

### Deployment

Have a look at this section of the `create-react-app` docs on how to deploy your app using Netlify: https://facebook.github.io/create-react-app/docs/deployment#netlify-https-wwwnetlifycom

Or see the [netlify-deployment.md file](netlify-deployment.md) in this repo 😎

**Before moving onto the 'if time' and 'extra credit' sections, submit your code for review! Please send a link to both your GitHub project and your hosted version to the FE2 slack channel** 😀

### Extra credit

1. As a user, I should be able to see which users have been most active adding articles and comments
2. As a user, I should be able to sort the users by how popular they are based on an aggregation of their article and comment vote counts

### Important

This sprint is among the ones we'll ask you to complete in order to put you forward for jobs. Put a little bit of love into it! :)
