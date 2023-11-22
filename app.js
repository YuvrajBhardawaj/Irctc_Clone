import express from "express";
import { getData, putData, trainsData, bookTicket, bookedTicketsHistory, cancelTicket } from "./database.js";
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
        const id=req.headers.cookie.substring(40);
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

app.get('/trainsList/:id',async(req,res)=>{
    const trainNo=req.params.id
    //console.log(trainNo)
    const data=req.headers.cookie.substring(40);
    res.render("booking.ejs",{data,trainNo})
    // res.send(`User ID: ${trainNo}`);
})
app.post('/booked',async(req,res)=>{
    const {trainNo,name,gender,ph,aadhar,age,email,date}=req.body
    console.log(name,gender,ph,aadhar,age,email,date,trainNo)
    const usrId=req.headers.cookie.substring(40)
   // console.log(id)
    const data=await bookTicket(trainNo,usrId,name,gender,age,aadhar,email,date)
    res.render("loading.ejs")
})
app.get('/bookinghistory',async(req,res)=>{
    const userID=req.headers.cookie.substring(40)
    const data=await bookedTicketsHistory(userID)
    res.render("bookedtickets.ejs",{data,userID})
})

app.get('/loggingOut',async(req,res)=>{
    res.clearCookie('uid')
    res.redirect('/home')
})
app.post('/CancelTicket',async(req,res)=>{
    const {trainNo,username,passengerName}=req.body
    console.log(trainNo,username,passengerName)
    const data=await cancelTicket(trainNo,username,passengerName)
})
app.listen(3000,()=>{
    console.log("Server started")
})