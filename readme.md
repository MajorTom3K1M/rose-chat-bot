# Rosé Chatbot
<p align="center">
  <img height="500" src="https://raw.githubusercontent.com/MajorTom3K1M/rose-chat-bot/master/example/DEMO.gif">
</p>

## Chatbot for online merchant

Rosé Chatbot is a LINE chatbot acted as an interface between a merchant and their customer. Their customer will have new experience on using them.
Unfortunately, this version of chatbot is only supported Thai language.

## Installation
    git clone https://github.com/MajorTom3K1M/rose-chat-bot.git
    npm install

## Get your LINE channel ready (If you've already had, skip this one)
- Go to https://developers.line.biz/
- Login with your LINE account
- Create new provider
- Create new 'Messaging API' channel
- In the channel, what we will use are 'Channel Secret', 'Channel access token' also you will need your 'Webhooks' enabled
- Optionally, you can disable your 'Auto-reply' and 'Greeting' messages too.
- You must have your own deployment place which have SSL (If not, we recommend using Heroku)

## Usage
- You must have LINE channel first 
- Deploy it on your deployment site (You have to guarantee that it has SSL)
- Put your URL in Webhook URL, also verify it
- Enjoy :)

## Admin Panel Screenshot
<p align="center">
  <img width="250" src="https://raw.githubusercontent.com/MajorTom3K1M/rose-chat-bot/master/example/rs-1.png">
  <img width="250" src="https://raw.githubusercontent.com/MajorTom3K1M/rose-chat-bot/master/example/rs-2.png">
</p>
