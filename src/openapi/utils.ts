import { readFileSync } from "fs";
import yaml from 'js-yaml';

export type ApiPath = {
  path: string,
  operation: string
  description?: string
  summary?: string
}

export type ApiTag = {
  name: string,
  description?: string
}

/* Lazy-loaded singleton */
const ApiDefinition = ((): any => {

  let instance: any;

  const createInstance = (path: string): any => {
    try {
      const apiDefinition = readFileSync(path, { encoding: 'utf-8' });
      return path.endsWith('.yml') || path.endsWith('.yaml') ? yaml.load(apiDefinition) : JSON.parse(apiDefinition);
    } catch (err) {
      throw err;
    }
  }

  return {
    getInstance: (path: string): any => {
      if (!instance) {
        instance = createInstance(path);
      }
      return instance;
    }
  }
})();

export const getApiPaths = (): ApiPath[] => {
  const results: ApiPath[] = [];

  const apiDefinition = ApiDefinition.getInstance('./openapi.yaml');
  console.log(apiDefinition);

  Object.keys(apiDefinition.paths).map((path) => {
    Object.keys(apiDefinition.paths[path]).map((operation) => {
      const { summary, description } = apiDefinition.paths[path][operation]
      results.push({ path, operation, summary, description })
    });
  });

  return results;
}

export const getApiTags = (): ApiTag[] => {
  const apiDefinition = ApiDefinition.getInstance('./openapi.yaml');

  return Object.keys(apiDefinition.tags).map((tag) => {
    return apiDefinition.tags[tag]
  });
}