const express = require("express");

 
const app = express();
 
app.get('/', (request:any, response:any) => {
  response.send('Hello world');
});
app.get('/all', (request:any, response:any) => {
    response.send(' It is work');
  });
   
app.listen(2000);


export default app;