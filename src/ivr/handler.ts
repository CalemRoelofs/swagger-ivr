import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { getApiPaths, getApiTags } from "../openapi/utils";

const ttsConfig: VoiceResponse.SayAttributes = {
  voice: 'woman',
  language: 'en-AU'
}

export const welcome = (): string => {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: 1,
    method: 'POST',
  });

  gather.say(ttsConfig,
    `Welcome to Swagger I V R.
    Please press 1 for paths.
    Please press 2 for tags`
  )

  return voiceResponse.toString();
}

export const menu = function menu(digit: string): string {
  const optionActions = {
    '1': listPaths,
    '2': listTags
  };
  // @ts-ignore
  return (optionActions[digit])
    // @ts-ignore
    ? optionActions[digit]()
    : redirectWelcome();
};

export const listPaths = (): string => {
  const twiml = new VoiceResponse();
  const paths = getApiPaths();

  paths.map((path) => {
    twiml.say(ttsConfig,
      `Path ${path.path}. 
      Operation: ${path.operation}.
      Summary: ${path.summary ? path.summary : 'No summary provided'}
      Description: ${path.description ? path.description : 'No description provided'}`
    );
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}

export const listTags = (): string => {
  const twiml = new VoiceResponse();
  const tags = getApiTags();

  tags.map((tag) => {
    twiml.say(ttsConfig,
      `Name: ${tag.name}. 
      Description: ${tag.description ? tag.description : 'No description provided'}.
      `
    );
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}

const redirectWelcome = (): string => {
  const twiml = new VoiceResponse();

  twiml.say(ttsConfig, 'Returning to the main menu');

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}