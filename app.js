import express from "express";
import { getData, putData, trainsData } from "./database.js";
const app=express()
app.use(express.json())
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.get('/home',async(req,res)=>{
    res.render("index.ejs")
})
app.post('/TrainsSearch',async(req,res)=>{
    const {from,to,date}=req.body
    const data=await trainsData(from,to)
    console.log(data)
    res.render("trainsSearch.ejs",{data})
})
//render
app.get('/login',async(req,res)=>{
    res.render("login.ejs")
})
app.post('/login',async(req,res)=>{
    try {
        const data=await getData()
        const {username,pass}=req.body
        data.forEach(e=>{
            console.log(e.username,e.password)
            console.log(username,pass)
            if(username===e.username && pass===e.password){
                res.send("Login Successful")
                return
            }
        })
    } catch (error) {
        res.send("Failed")
    }    
})

app.get('/register',async(req,res)=>{
    res.render("register.ejs")
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

app.listen(3000,()=>{
    console.log("Server started")
})