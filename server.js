//TO GET THE DATA
//http://localhost:8000/api/users

//TO POST THE DATA
//STEP:1:- RUN THE INDEX.HTML AND ADD THE DATA
//STEP:2:- OPEN USERSLIST.JSON TO SEEN THE DATA

const express = require("express");
const fs = require("file-system");
//INSTALL :- npm install express
//npm instll file-system
//npm install urlencode
//npm install body-parser

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.post("/api/users",function(req,res){
    const newUsersData = req.body;
    const currentUsersData = require("./users.json");
    currentUsersData.push(newUsersData);
    fs.writeFile("./users.json", JSON.stringify(currentUsersData));
});

app.get("/api/users", function(request,response){
    const mockUsers = require("./users.json");
    response.send(mockUsers);
});

//WITH QUERY-PARAMS (?)
//GRAB THE DATA FROM USERS.JSON USING GET API
app.get("/users", function(request,response){
    const mockUsers = require("./users.json");
    let filterdUsers = mockUsers;
    //response.send(mockUsers);

    //QUERY PARAMS
    //query that we need to receive, by filter
    if(request.query.City){
        filterdUsers = [];
        for(let i=0; i < mockUsers.length; i++){
            //while calling, we ahve to call the given query params
            if(
                mockUsers[i].address.City == request.query.City&&
                mockUsers[i].address.Zipcode == request.query.Zipcode
                // mockUsers[i].address.id == request.query.id &&
                // mockUsers[i].address.username == request.query.username
             ){
                filterdUsers.push(mockUsers[i]);
            }
            // else{
            //     //status is used to send response from BE to FE
            //     //imp status codes are :200,201,404,400,503
            //     //if http://localhost:9000/users?city=Gwenboroughzipcode=92998-3874
            //     response
            //     .status("404")
            //     .json({message:"The User Was Not Found"})
            // }
        }
    }
    if(filterdUsers.length === 0 && request.query.Zipcode){
        response.status("400").send("Bad Request")
    }else if(filterdUsers.length===0){
        response.status("404").send("The Page Not Found")
    }

    response.send(filterdUsers)
    //here we can use json method instead of send method
})

// WITH PARAMS (/)
// we can write and thing instead of userID in app.get, it will be displayed in terminal
app.get("/users/:userID", function(request,response){
    console.log(request.params)
    if(request.params.userID){
        //FLITER THE USERID WITHIN THE DATA IN USERS.JSON
        const mockUsers = require("./users.json");
        let filterdUsers;
        for(let i=0;i<mockUsers.length;i++){
            if(mockUsers[i].id == request.params.userID){
                filterdUsers = mockUsers[i];
                break;
            }
        }
        response.json(filterdUsers)
    }
})



//SERVER CODE
app.listen(9002, function(){
    console.log("server is started with the port number 9002")
})