// NOTE: http is a core module
const http = require("http");
const fs = require("fs");

function rqListener(req, res) {
  console.log("second");
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
      console.log("chunk", chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  // NOTE: the type of the response will be html
  // ISSUE (35): this code is never seen on the screen
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>First Node JS app</title></head><body>This is my first Node JS app</body></html>"
  );
  res.end();
  // process.exit()
}

// const server = http.createServer(function(req, res){
//     console.log("first")
// })

const server = http.createServer(rqListener);

// const server = http.createServer((req,res)=> {
//     console.log("third")
// })

server.listen(3000);
