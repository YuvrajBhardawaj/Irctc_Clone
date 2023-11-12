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

export async function bookTicket(trainNo,id,passengerName,gender,aadhar,email,date){
    const[result]=await pool.query("INSERT INTO booking VALUES(?,?,?,?,?,?,?)",[trainNo,id,passengerName,gender,aadhar,email,date])
    return result
}