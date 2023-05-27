<h1>Codecup HSGS</h1>
WIP
<h2>Build and run a demo webpage</h2>
<h3>Front end</h3>
Build and run the front end server: 

```
cd frontend_giap
npm build
npm run dev
cd ..
```
Then go to http://localhost:3000/
<h3>Back end</h3>
Build and run the backend server: 

```
cd backend
npm build
npm run dev
cd ..
```
<h3>Database</h3>
Set up a local MongoDB database: 
<ul>
<li>Install and run a local MongoDB server: https://www.mongodb.com/docs/manual/installation/ </li>
</ul>
You can import sample user data & contest data or visit the website (http://localhost:3000/) and register users there. Temporarily we do not support creating contests as the admin functions are under development. 

Import sample user data & contest data: 
<ul>
<li>Download MongoDB compass https://www.mongodb.com/try/download/compass </li>
<li>In MongoDB compass, create a connection to mongodb://localhost:27017 </li>
<li>In the database "codecup", import the data <a href="https://github.com/Ddoraaaaa/codecuphsgs/tree/main/sampledata">here</a> into the corresponding collections. </li>
</ul>

You can log in as an administrator: 

```
username: admin
password: admin
```

<h2>Preview</h2>

