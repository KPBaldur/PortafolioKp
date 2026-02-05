const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configure Angular `environment.ts` file path
const targetPath = path.join(__dirname, '../src/environments/environment.ts');

// Check if we are in production based on NODE_ENV or explicit flag
const isProduction = process.env.NODE_ENV === 'production' || process.env.PRODUCTION === 'true';

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  production: ${isProduction},
  emailjs: {
    publicKey: '${process.env.EMAILJS_PUBLIC_KEY || ""}',
    serviceId: '${process.env.EMAILJS_SERVICE_ID || ""}',
    templateId: '${process.env.EMAILJS_TEMPLATE_ID || ""}'
  }
};
`;

console.log(`Generating environment.ts file at ${targetPath}`);
fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log(`Angular environment.ts file generated correctly.`);
    }
});
