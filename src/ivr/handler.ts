import VoiceResponse, { Gather } from "twilio/lib/twiml/VoiceResponse";
import { getApiInfo, getApiPaths, getApiTags } from "../openapi/utils";

const ttsConfig: VoiceResponse.SayAttributes = {
  voice: 'woman',
  language: 'en-AU'
}

export const welcome = (): string => {
  const voiceResponse = new VoiceResponse();
  const { title, version } = getApiInfo();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: 1,
    method: 'POST',
  });

  gather.say(ttsConfig,
    `Welcome to Swagger I V R.
    This documentation is for ${title} version ${version}.
    Please press 1 for description.
    Please press 2 for tags.
    Please press 3 for paths.`
  )

  return voiceResponse.toString();
}

export const menu = function menu(digit: string): string {
  const optionActions = {
    '1': sayDescription,
    '2': listTags,
    '3': listPaths,
  };
  // @ts-ignore
  return (optionActions[digit])
    // @ts-ignore
    ? optionActions[digit]()
    : redirectWelcome();
};

export const sayDescription = (): string => {
  const twiml = new VoiceResponse();
  const { description } = getApiInfo();

  twiml.say(ttsConfig,
    `Description: ${description ? description : 'No description provided.'}.`
  );

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

const redirectWelcome = (): string => {
  const twiml = new VoiceResponse();

  twiml.say(ttsConfig, 'Returning to the main menu');

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}