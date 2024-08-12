// NOTE: http is a core module
const http = require("http");
const fs = require("fs");

function rqListener(req, res) {
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
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //   sync stands for synchronous
      //   stops the execution of the code until the working with the file is done
      fs.writeFileSync("message.txt", message);
      // this part of code is moved inside but still there is an issue
      //   Cannot set headers after they are sent to the client
      res.statusCode = 302;
      res.setHeader("Location", "/");
      console.log(err);
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>First Node JS app</title></head><body>This is my first Node JS app</body></html>"
  );
  res.end();
}

const server = http.createServer(rqListener);

server.listen(3000);
