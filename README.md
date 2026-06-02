#ALWebServiceXMLGenerator

A simple automation tool for Microsoft Dynamics 365 Business Central (AL) that generates TenantWebService XML from all API pages in your AL project.

This helps developers avoid manually maintaining web service entries for API pages.

🚀 What It Does

This script automatically:

Scans all .al files in your AL project
Detects pages with PageType = API
Extracts:
Object ID
Service Name (EntitySetName / EntityName)
Generates a ready-to-use TenantWebServices.xml
📂 Project Setup
1. Add the script

Place the following file directly in your AL project root:

Generate-WebService.js
2. Add VS Code Task

Create this file in your project:

.vscode/tasks.json

Use the provided tasks.json file from this repository.

▶️ How to Run

In VS Code:

Press

Ctrl + Shift + P

Select:

Tasks: Run Task

Choose:

Generate WebServices XML
📄 Output

After execution, the script generates:

TenantWebServices.xml

This XML will include all AL API pages in the following structure:

<ExportedData>
  <TenantWebServiceCollection>
    <TenantWebService>
      <ObjectType>Page</ObjectType>
      <ObjectID>70100</ObjectID>
      <ServiceName>CustomersAPI</ServiceName>
      <Published>true</Published>
    </TenantWebService>
  </TenantWebServiceCollection>
</ExportedData>
⚙️ Use Case

Once you publish your AL extension:

You can import this XML into Business Central
All API pages will be automatically available under Web Services
No manual setup required
💡 Benefits
Eliminates manual Web Service configuration
Reduces human errors
Speeds up API deployment
Keeps environments consistent across dev/test/prod
📌 Notes
Only works with PageType = API
Assumes standard AL project structure
Requires Node.js installed
📣 Contributing

Feel free to improve the script, add features, or convert it into a full VS Code extension.

🏷️ Tags

#BusinessCentral #ALLanguage #Dynamics365 #VSCode #ERP #Automation
