# Swagger IVR  
Finding yourself reading a API definitions and thinking _"This is too easy, there has to be a harder way!"_? 🤔  
Sick of the bright colours and utility of [Swagger UI](https://github.com/swagger-api/swagger-ui) and [Redoc](https://github.com/Redocly/redoc)? 🎨  
Wish you could review documentation with nothing but a screenless telephone? ☎️  
Then look no further, your prayers have been answered! 🙌🏼  

Swagger IVR will convert your OpenAPI definition into a [TwiML](https://www.twilio.com/docs/voice/twiml) 
[IVR (Interactive Voice Response)](https://www.twilio.com/docs/interactive-voice-response) webhook server 
to build a phone tree that can be dialled into and listened to by anyone!  

For a quick demo, call [+44 7401 195003](tel:+44-740-1195003), which will be up for as long as there is credit remaining on that Twilio account.

## Installation  
To run the application locally:  
```bash
$ npm ci
$ npm run build
$ npm run start
```

To build and run with Docker:  
```bash
$ npm ci
$ npm run docker
```

## Usage 
### Before you start:  
- Swagger IVR uses [Twilio's Programmable Voice](https://www.twilio.com/docs/voice) offering to power the IVR functionality, and as such most of the setup is done over there.  
- When Swagger IVR runs, currently it will parse whatever API definition is saved in `./openapi.yaml` in the root of the project.  
- OpenAPI definitions are not resolved or dereferenced currently, so for the best experience use a fully dereferenced OpenAPI definition.  
- Twilio does charge 1c per minute (or per part of a minute, meaning 1 minute and 1 second is still billed at 2 minutes) on incoming calls, so there is some cost to running this yourself.  

### Setup: 
1. Run Swagger IVR and make it accessible to the internet using something like [ngrok](https://ngrok.com/).  
2. [Buy a voice-enabled phone number](https://www.twilio.com/console/phone-numbers/incoming) from Twilio and [configure it to send webhook requests](https://www.twilio.com/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls/node#buy-and-configure-a-phone-number) to your URL when a call comes in.  
3. Dial the phone number you have purchased in Step 2.  





