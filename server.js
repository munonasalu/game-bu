'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  if(event.message.text!=="ゲーム部プロジェクト" &&event.message.text!=="Contact" &&event.message.text!=="夢咲楓" &&event.message.text!=="部長" &&event.message.text!=="道明寺晴翔" &&event.message.text!=="副部長"　&&event.message.text!=="道明寺晴翔" &&event.message.text!=="桜樹みりあ" &&event.message.text!=="風見涼"){
    var rand = Math.floor(Math.random()*10)+1;
    var selectText;
    switch (rand) {
      case 1:
        selectText = "楓「シャドウボールゥ！」"
        break;
      case 2:
        selectText = "涼「メロンパンメロンパンメロンパン」"
        break;
      case 3:
        selectText = "晴翔「ﾌﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊﾊ！」"
        break;
      case 4:
        selectText = "みりあ「ぽよ〜」"
        break;
      case 5:
        selectText = "楓「ふりゃあああああああ！！！」"
        break;
      case 6:
        selectText = "涼「はるくんとは親友なんです。」"
        break;
      case 7:
        selectText = "晴翔「アホピンクめ」"
        break;
      case 8:
        selectText = "みりあ「ハルカス」"
        break;
      case 9:
        selectText = "みりあ「ぽよすぞ。」"
        break;
      case 10:
        selectText = "晴翔「ハイ雑魚〜！！雑魚咲楓〜！」"
        break;
    }
  }
  const echo = { type: 'text', text: selectText };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
