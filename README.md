# chillJam
A javascript bot for entering twitter competitions, built in week 9 of the Makers Academy bootcamp.

[![Screen_Shot_2018-04-17_at_06.40.59.png](https://s31.postimg.cc/3zizo6z8b/Screen_Shot_2018-04-17_at_06.40.59.png)](https://postimg.cc/image/iiq4plsd3/)

[![Screen_Shot_2018-04-17_at_06.41.50.png](https://s31.postimg.cc/bs9ng6kmz/Screen_Shot_2018-04-17_at_06.41.50.png)](https://postimg.cc/image/5rbyj3y0n/)

### Technologies used
- Express.js
- Node.js
- node-twitter
- HTML/EJS


Testing
- Mocha
- Chai
- Zombie

### To run tests
```
$ git clone git@github.com:Jestfer/chillJam.git
$ cd chillJam
$ npm install
// unit tests //
$ npm test
// feature tests //
$ mocha test/features/indexSpec.js
// Twitter api integration test //
$ mocha test/integration/APICall.js
```

### Approach

- Used Agile methodologies to manage the team.
  - We started with an MVP - a website which would return all competition tweets featuring a certain search term defined by the user.
  - Next we iterated on that model. V2 automatically likes, follows and retweets any tweets returned by the search.
  - Once that was complete we refactored the model to clean the code.
  - We held morning standups in which we assigned pairing partners and divided up the work which needed to be done.
  - We also held a standup at the end of each day, to recap what had happened, plan the path forward, and provide feedback.
  - Lastly, we made use of frequent informal knowledge sharing meetings during the day to ensure that each team member had strong knowledge of the entire codebase.


- As is often the case when learning new technologies, true Test Driven Development can be tricky, however, once the core functionality was in place we worked hard to test it as thoroughly as possible.

### Learnings

- As part of the iteration process, we explored our knowledge of Promises and their functions.
- Working with the Twitter API has been extremely interesting and we have successfully implemented a variety of features using the RESTful routes it provides.
- We set up the express app from scratch with limited experience. The bulk of the infrastructure for the app was in place by the afternoon of the first day.
- We spent some time researching OAuth and the Twitter authentication process. Our initial plan had been to create this functionality ourselves, but following research we found that this was likely beyond the scope of the project.
