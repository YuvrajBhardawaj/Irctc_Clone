import express from "express";
import { getData, putData, trainsData, bookTicket } from "./database.js";
import { v4 as uuid4 } from "uuid";
const app=express()
app.use(express.json())
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.get('/home',async(req,res)=>{
    if(!req.headers.cookie){
        console.log(req.headers.cookie)
        res.render("index.ejs")
    }
    else{   
        const id=req.headers.cookie.substr(40);
        res.render("index2.ejs",{id})
    }
})
app.post('/TrainsSearch',async(req,res)=>{
    const {from,to}=req.body
    const data=await trainsData(from,to)
    console.log(data)
    res.render("trainsSearch.ejs",{data})
})
//render

app.post('/login',async(req,res)=>{
    const {username,pass}=req.body
    console.log(username,pass)
    const data=await getData(username,pass)
    console.log(data)
    if(data.length===0){
        res.send("failed")
    }
    else{
        const sessionId=uuid4()+username;
        res.cookie("uid",sessionId)
        res.redirect("/home")
        // console.log(req.headers.cookie)
    }
})

app.post('/register',async(req,res)=>{
    const {username,Email,pass}=req.body
    try{
        const data=await putData(username,pass,Email)
        res.send("Successful")
    }
    catch{
        res.send("failed")
    }
    // if(data){
    //     res.render("Registration Successful")
    // }
    // else{
    //     res.render("Failed")
    // }
})

app.get('/:id',async(req,res)=>{
    const trainNo=req.params.id
    //console.log(trainNo)
    const data=req.headers.cookie.substr(40);
    res.render("booking.ejs",{data,trainNo})
})
app.post('/booked',async(req,res)=>{
    const {trainNo,name,gender,ph,aadhar,age,email,date}=req.body
    console.log(name,gender,ph,aadhar,age,email,date,trainNo)
    const usrId=req.headers.cookie.substr(40)
   // console.log(id)
    const data=await bookTicket(trainNo,usrId,name,gender,age,aadhar,email,date)
    res.render("loading.ejs")
})

app.listen(3000,()=>{
    console.log("Server started")
})