<h1>Codecup HSGS</h1>
A website to host programming contests. 
<h2>Build and run a demo webpage</h2>
<h3>Front end</h3>
Build and run the front end server: 

```
cd frontend_giap &&
npm run build &&
npm run dev
```
Then go to http://localhost:3000/
<h3>Back end</h3>
Build and run the backend server: 

```
cd backend && 
npm i &&
npm run dev
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



<img width="1488" alt="Screen Shot 2023-05-27 at 11 23 18 pm" src="https://github.com/Ddoraaaaa/codecuphsgs/assets/112223883/d3930cea-0ac8-4dfe-8583-3ff24643a0a5">
<img width="1490" alt="Screen Shot 2023-05-27 at 11 23 24 pm" src="https://github.com/Ddoraaaaa/codecuphsgs/assets/112223883/b3ca240a-8b6c-4be7-9cac-2f348ff9f656">
<img width="1489" alt="Screen Shot 2023-05-27 at 11 24 23 pm" src="https://github.com/Ddoraaaaa/codecuphsgs/assets/112223883/529a1ce7-a73f-4f17-87b5-85187076cb5f">
<img width="1492" alt="Screen Shot 2023-05-27 at 11 24 42 pm" src="https://github.com/Ddoraaaaa/codecuphsgs/assets/112223883/c9ca71cd-7b79-4f58-bc83-4af41814835a">
<img width="1509" alt="Screen Shot 2023-05-27 at 11 24 52 pm" src="https://github.com/Ddoraaaaa/codecuphsgs/assets/112223883/c815b544-6edb-478f-855e-a7fb7b270313">
<img width="1508" alt="Screen Shot 2023-05-27 at 11 25 14 pm" src="https://github.com/Ddoraaaaa/codecuphsgs/assets/112223883/40e0bcc3-b9da-4d16-9c7a-0854f1c9db28">
