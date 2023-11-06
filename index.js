import { configDotenv } from "dotenv";
import fs from "fs";
import groupdocs_conversion_cloud from "groupdocs-conversion-cloud";

// config env
configDotenv();

const clientId = process.env.CLIENT_ID; // groupdocs client id
const clientSecret = process.env.CLIENT_SECRET; // groupdocs client secret
// const clientId = "8c8accfa-7b53-4566-8308-37937a48c560"; // groupdocs client id
// const clientSecret = "7b0e68bf2cdce8d39b5a4e30f326021d"; // groupdocs client secret
global.myStorage = "Internal";

const config = new groupdocs_conversion_cloud.Configuration(
  clientId,
  clientSecret
);
config.apiBaseUrl = "https://api.groupdocs.cloud";

var resourcesFolder = "QP_ENG.pdf";
fs.readFile(resourcesFolder, (err, fileStream) => {
  // construct FileApi
  var fileApi = groupdocs_conversion_cloud.FileApi.fromConfig(config);
  // create upload file request
  var request = new groupdocs_conversion_cloud.UploadFileRequest(
    "sample.pdf",
    fileStream,
    myStorage
  );
  // upload file
  fileApi.uploadFile(request);
});

// initialize api
let convertApi = groupdocs_conversion_cloud.ConvertApi.fromKeys(
  clientId,
  clientSecret
);

// define convert settings
let settings = new groupdocs_conversion_cloud.ConvertSettings();
settings.filePath = "sample.pdf"; // input file path on the cloud
settings.format = "docx"; // output format
settings.outputPath = "output"; // output file folder on the cloud

// create convert document request
let request = new groupdocs_conversion_cloud.ConvertDocumentRequest(settings);

// convert document
let result = await convertApi.convertDocument(request);
console.log("Document converted successfully: " + result[0].url);

// construct FileApi
var fileApi = groupdocs_conversion_cloud.FileApi.fromConfig(config);

// create download file request
let Newrequest = new groupdocs_conversion_cloud.DownloadFileRequest(
  "output/sample.docx",
  myStorage
);

// download file
let response = await fileApi.downloadFile(Newrequest);

// save file in your working directory
fs.writeFile("sample.docx", response, "binary", function (err) {});
console.log(response);
