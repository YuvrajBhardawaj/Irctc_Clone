import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool=mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise()

export async function getData(user,pass){
    const [result]=await pool.query("Select * from auth where username=? and password=?",[user,pass])
    return result
}

export async function putData(username,password,email){
    const [result]=await pool.query("INSERT into auth(username,password,email) values(?,?,?)",[username,password,email])
    return result
}

export async function trainsData(from,to){
    const [result]=await pool.query("Select * from trainsList where fromStation=? and toStation=?",[from,to])
    return result
}

export async function bookTicket(trainNo,id,passengerName,gender,age,aadhar,email,date){
    const[result]=await pool.query("INSERT INTO booking VALUES(?,?,?,?,?,?,?,?)",[trainNo,id,passengerName,gender,age,aadhar,email,date])
    return result
}

export async function bookedTicketsHistory(userID){
    const [result]=await pool.query("SELECT * from booking b JOIN trainslist t ON b.trainNo=t.trainNo where username=?",[userID])
    return result
}

export async function cancelTicket(trainNo,username,pName){
    const [result]=await pool.query("CALL cancelTicket(?,?,?)",{username,trainNo,pName})
    return result
}