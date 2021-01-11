const mysql=require('mysql')

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'project1'
})

// db.connect((err)=>{
//     if (err) throw err
//     console.log('Database berhasil dihubungkan')
// })
module.exports=db