const defineParams = (query) => {
  const params = {
    q: '#competition #' + query + ' -RT',
    count: 2,
    result_type: 'recent',
    lang: 'en'
  };
  return params;
};

const getTweetsReq = (twitter, params) => {
  return twitter.get('search/tweets', params);
};

const likeReq = (twitter, tweetId) => {
  twitter.post('favourites/create', { id: tweetId });
  console.log('You liked tweet with id: ' + tweetId);
};

const retweetReq = (twitter, tweetId) => {
  twitter.post('statuses/retweet', { id: tweetId });
  console.log('You retweeted tweet with id: ' + tweetId);
};

const followReq = (twitter, userId) => {
  twitter.post('friendships/create', { id: userId });
  console.log('You made friends with user with id: ' + userId);
};

const likeAllTweets = (twitter, tweets) => {
  tweets.map(el => likeReq(twitter, el.id));
};

const retweetAllTweets = (twitter, tweets) => {
  tweets.map(el => retweetReq(twitter, el.id));
};

const followAllUsers = (twitter, tweets) => {
  tweets.map(el => followReq(twitter, el.userId));
};

module.exports = {
  defineParams: defineParams,
  getTweetsReq: getTweetsReq,
  likeAllTweets: likeAllTweets,
  retweetAllTweets: retweetAllTweets,
  followAllUsers: followAllUsers,
  likeReq: likeReq,
  retweetReq: retweetReq,
  followReq: followReq
};
