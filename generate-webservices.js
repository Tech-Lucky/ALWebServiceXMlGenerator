const fs = require('fs');
const path = require('path');

const srcFolder = './src';
const outputFile = './TenantWebServices.xml';

function findAlFiles(dir) {
    let results = [];

    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(findAlFiles(fullPath));
        } else if (file.endsWith('.al')) {
            results.push(fullPath);
        }
    }

    return results;
}

function getProperty(content, propertyName) {
    const regex = new RegExp(`${propertyName}\\s*=\\s*'([^']+)'`, 'i');
    const match = content.match(regex);
    return match ? match[1] : '';
}

function getObjectId(content) {
    const match = content.match(/page\s+(\d+)/i);
    return match ? match[1] : '';
}

function isApiPage(content) {
    return /PageType\s*=\s*API/i.test(content);
}

const files = findAlFiles(srcFolder);

const services = [];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    if (!isApiPage(content)) continue;

    const objectId = getObjectId(content);
    const serviceName =
        getProperty(content, 'EntitySetName') ||
        getProperty(content, 'EntityName') ||
        'UNKNOWN';

    services.push({
        objectId,
        serviceName,
        published: true
    });
}

// 🔥 XML START (matches your structure exactly)
let xml = `<?xml version="1.0" encoding="utf-8"?>
<ExportedData>
  <TenantWebServiceCollection>
`;

for (const s of services) {
    xml += `    <TenantWebService>
      <ObjectType>Page</ObjectType>
      <ObjectID>${s.objectId}</ObjectID>
      <ServiceName>${s.serviceName}</ServiceName>
      <Published>${s.published}</Published>
    </TenantWebService>
`;
}

xml += `  </TenantWebServiceCollection>
</ExportedData>
`;

fs.writeFileSync(outputFile, xml, 'utf8');

console.log(`Generated: ${outputFile}`);