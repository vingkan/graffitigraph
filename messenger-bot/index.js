var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var Firebase = require('firebase')

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
    	sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            //sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
    	}
    	if(event.message && event.message.attachments){
            var fb = new Firebase('https://firedates.firebaseio.com/graffiti');
            for(var i = 0; i < event.message.attachments.length; i++){
                var a = event.message.attachments[i]
                if(a.payload && a.payload.url){
                    //sendTextMessage(sender, a.payload.url)
                    fb.push(a.payload.url)
                }
            }
    	}
    }
    res.sendStatus(200)
})

var token = "CAAX5SOQGM1gBAJbjQZCpz4VWHZC82JZCULTmrN9VFTtVwpFZCLB1DMFrObx3eILDT6CsuStmja9EyuntIJdpc9SNrLofI5dEKZBBE4YC9wOOLxVxwCVJ0k09FjqQEQWgQhGmiD31Wa4E4tIr1alwEfLZBHcpv8OOHygPWCE4QA7ZAWC5QJwPBAAzbqZAYHpZAuQ8ZD"

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

/*function getImage(mid, aid) {
    request({
        url: 'https://api.facebook.com/method/messaging.getattachment',
        qs: {access_token:token},
        method: 'GET',
        format: 'json',
        mid: mid,
        aid: aid
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}*/