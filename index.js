const express = require('express');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (like logo image) from the "assets" folder
app.use(express.static('assets'));

// Serve a simple form to input the link
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            margin: 0;
           }
          .container {
            text-align: center;
            height: 100vh;
             display: flex;
             align-items: center;
           }
            .image-container {
            text-align: center;
            margin-top: 37px;
             }
          form {
            margin-bottom: 20px;
          }
          input[type="text"] {
            padding: 10px;
            width: 300px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 10px;
          }
          input[type="submit"] {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          input[type="submit"]:hover {
            background-color: #218838;
          }
        </style>
      </head>
      <body>
         <div class="image-container">
            <img src="https://i.postimg.cc/Ss53b2b0/D-Hoppers.png" alt="Logo" style="width: 150px;"><br>
          </div>
        <div class="container">
       
          <form action="/generate" method="POST">
            <label for="link">Enter a link:</label><br>
            <input type="text" id="link" name="link" placeholder="Enter your URL here"><br>
            <input type="submit" value="Generate QR Code">
          </form>
        </div>
      </body>
    </html>
  `);
});

// Generate QR code for the input link
app.post('/generate', (req, res) => {
  const inputLink = req.body.link;

  // Generate QR code
  qrcode.toDataURL(inputLink, (err, src) => {
    if (err) res.send('Error occurred');

    // Return the QR code as an image, centered on the page with a download button
    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
               background-color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              height: 100vh;
              margin: 0;
             }
            .container {
              text-align: center;
               height: 100vh;
             display: flex;
             align-items: center;
                 margin-top: 100px;
              flex-direction: column;

            }
             .image-container {
            text-align: center;
            margin-top: 37px;
             }
             
            img {
              margin-top: 20px;
            }
            a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              cursor: pointer;
            }
            a:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
              <div class="image-container">
            <img src="https://i.postimg.cc/Ss53b2b0/D-Hoppers.png" alt="Logo" style="width: 150px;"><br>
            
          </div>

          <div class="container">
            <p>Here is your QR Code:</p>
            <img src="${src}" alt="QR Code"><br>
            <a href="${src}" download="qrcode.png">Download QR Code</a><br>
            <a href="/">Generate another QR Code</a>
          </div>
        </body>
      </html>
    `);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
