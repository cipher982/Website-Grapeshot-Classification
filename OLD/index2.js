

var AWS = require('aws-sdk');
AWS.config.update(
  {
    accessKeyId: ".. your key ..",
    secretAccessKey: ".. your secret key ..",
  }
);

document.getElementById('micro-out-div').innerText = 'test';

var s3 = new AWS.S3();
s3.getObject(
  { Bucket: "my-bucket", Key: "my-picture.jpg" },
  function (error, data) {
    if (error != null) {
      alert("Failed to retrieve an object: " + error);
    } else {
      alert("Loaded " + data.ContentLength + " bytes");
      // do something with data.Body
    }
  }
);