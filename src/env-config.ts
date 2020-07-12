require('dotenv').config();

const env = {
  production: process.env.ENVIRONMENT === 'production',
  ENVIRONMENT: process.env.ENVIRONMENT,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_CONTENT_ENV: process.env.CONTENTFUL_CONTENT_ENV
};
const envConfigFile = `export const environment = ${JSON.stringify(env)};`;
const targetPath = (env.production) ? './src/environments/environment.prod.ts' : './src/environments/environment.ts';

require('fs').writeFile(targetPath, envConfigFile,  (err) => {
  if (err) {
    console.log(err);
  }
});
