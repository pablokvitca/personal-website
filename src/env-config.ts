require('dotenv').config();

const environment: any = process.env;
environment.production = environment.ENVIRONMNET === 'production';
const envConfigFile = `export const environment = ${JSON.stringify(environment)};`;
const targetPath = (environment.production) ? './src/environments/environment.ts' : './src/environments/environment.prod.ts';

require('fs').writeFile(targetPath, envConfigFile,  (err) => {
  if (err) {
    console.log(err);
  }
});
