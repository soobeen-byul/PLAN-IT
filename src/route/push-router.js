const express = require('express'),
      router  = express.Router();

const HappyRedis = require('../happyredis');

//subscription create
router.post('/subscriptions', (req, res, next) => {
  let subscription = JSON.parse(req.body.subscription),
      redisClient = new HappyRedis();

  redisClient.hincrby('subscription', 'lastId', 1, (idErr, lastId) => {
    if(idErr) {
      return next(idErr);
    }

    subscription.id = lastId;
    redisClient.hset('subscription', lastId, JSON.stringify(subscription), (insertErr, affectedRows) => {
      redisClient.quit();

      if(insertErr) {
        return next(insertErr);
      }
      res.status(200).json(subscription);
    })
  });
});

module.exports = router;