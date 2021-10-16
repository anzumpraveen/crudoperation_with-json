const express=require("express")
const fs =require("fs")
const app=express()
app.use(express.json())

app.post("/user/add",(req,res)=>{
    const existUsers=read()
    const userData=req.body

    if (userData.fullname == null || userData.age == null || userData.username == null || userData.password == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
    
    const findExist = existUsers.find( user => user.username === userData.username )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'username already exist'})
    }
    
    existUsers.push(userData)
   
    write(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})

app.get('/user/list', (req, res) => {
    const users = read()
    res.send(users)
})

app.put('/user/update/:username', (req, res) => {
    const username = req.params.username
    const userData = req.body
    const existUsers = read()
          
    const findExist = existUsers.find( user => user.username === username )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'username not exist'})
    }
    const updateUser = existUsers.filter( user => user.username !== username )
   
    updateUser.push(userData)
   
    write(updateUser)
    res.send({success: true, msg: 'User data updated successfully'})
})

app.delete('/user/delete/:username', (req, res) => {
    const username = req.params.username
  
    const existUsers = read()
   
    const filterUser = existUsers.filter( user => user.username == username )
    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'username does not exist'})
    }
    write(filterUser)
    res.send({success: true, msg: 'User removed successfully'})
})



const write=(data)=>{
    const stringfy_data=JSON.stringify(data,null,2)
    fs.writeFileSync("Details.json",stringfy_data)
}
const read=()=>{
    const get_data=fs.readFileSync("Details.json")
    return JSON.parse(get_data)
}
app.listen(2000,()=>{
    console.log("give some value");
})







