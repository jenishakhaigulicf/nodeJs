const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write("<body><form action='/message' method='POST'>");
    res.write(
      "<input type='text' name='message'><button type='submit'>Send</button>"
    );
    res.write("</form></body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    // NOTE: add return here so that the code below does not run
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //   sync stands for synchronous
      //   stops the execution of the code until the working with the file is done
      fs.writeFileSync("message.txt", message);

      fs.writeFile("message.txt", message, (err) => {
        // this part of code is moved inside further mores
        res.statusCode = 302;
        res.setHeader("Location", "/");
        console.log("err",err);
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>First Node JS app</title></head><body>This is my first Node JS app</body></html>"
  );
  res.end();
};

// METHOD 1
// module.exports = requestHandler

// METHOD 2
// module.exports = {handler: requestHandler, someText: "Some hardcoded text"}

// METHOD 3
// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text"

// METHOD 4
exports.handler = requestHandler;
exports.someText = "Some hard coded texttt"
