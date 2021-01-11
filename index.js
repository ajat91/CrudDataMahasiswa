const express=require('express')
const app=express()
const bp=require('body-parser')
const db=require('./config/db')

db.connect(()=>{
    const sql=`create table if not exists mahasiswa
    (
        id int auto_increment primary key,
        nama varchar(30) not null,
        npm int not null,
        uap int not null,
        uts int not null,
        uas int not null,
        status varchar(20),
        grade varchar (10)
    )`

    db.query(sql,(err)=>{
        if (err) throw err
        console.log('Table berhasil dibuat')
    })
})

app.set('view engine','ejs')
    app.set('views', __dirname + '/views')
    app.use(bp.urlencoded({extended:false}))

app.get('/tambah',(req,res)=>{
    res.render('tambah.ejs')
})

app.post('/tambah',(req,res)=>{

    let {nama,npm,uap,uas,uts}=req.body
    let grade=''
    let status=''
    let rata=(parseInt(uas)+parseInt(uap)+parseInt(uts))/3
    

    if (rata>=90){
        grade='A'
        status='LULUS'
    }
    else if (rata>=80){
        grade='B'
        status='LULUS'
    }
    else if (rata>=60){
        grade='C'
        status='LULUS'
    }
    else if (rata>=40){
        grade='D'
        status='LULUS'
    }
    else if (rata>=30){
        grade='E'
        status='TIDAK LULUS'
    }
    else  {
        grade='F'
        status='TIDAK LULUS'
    }
     
        db.connect(()=>{
        const sql=`insert into mahasiswa (nama,npm,uas,uap,uts,grade,status,rata) values 
                    ('${nama}','${npm}','${uas}','${uap}','${uts}','${grade}','${status}','${rata}')`
        db.query(sql,(err)=>{
            if (err) throw err
            res.redirect('/')
        })
    })
})

    app.get('/',(req,res)=>{
        db.connect(()=>{
            const sql=`select * from mahasiswa`
            db.query(sql,(err,result)=>{
                if (err) throw err
                res.render('index.ejs',{
                    mahasiswa:result
                })
            })
        })
    })

    app.get('/:id/detail',(req,res)=>{
        const {id}=req.params
        db.connect(()=>{
            const sql=`select * from mahasiswa where id=${id}`
            db.query(sql,(err,result)=>{
                if (err) throw err
                res.render('detail.ejs',{
                    mahasiswa:result
                })
            })

        })
    })

    app.get('/:id/edit',(req,res)=>{
        const {id}=req.params
        db.connect(()=>{
            const sql=`select * from mahasiswa where id=${id}`
            db.query(sql,(err,result)=>{
                if (err) throw err
                res.render('edit.ejs',{
                    mahasiswa:result
                })
            })

        })
    })

    app.post('/:id/edit',(req,res)=>{
        //menyimpan data setelah diedit
        let {id}=req.params
        let {uas,uap,uts}=req.body
        let grade=''
        let status=''
        let rata=(parseInt(uas)+parseInt(uap)+parseInt(uts))/3
            

            if (rata>=90){
                grade='A'
                status='LULUS'
            }
            else if (rata>=80){
                grade='B'
                status='LULUS'
            }
            else if (rata>=60){
                grade='C'
                status='LULUS'
            }
            else if (rata>=40){
                grade='D'
                status='LULUS'
            }
            else if (rata>=30){
                grade='E'
                status='TIDAK LULUS'
            }
            else  {
                grade='F'
                status='TIDAK LULUS'
            }
            
    
        db.connect(()=>{
            const sql= `update mahasiswa set uas='${uas}',uap='${uap}',uts='${uts}',rata='${rata}',status='${status}',grade='${grade}' where id=${id}`
            db.query(sql,(err)=>{
                if (err) throw err
                res.redirect('/')
            })
        })
    })

    app.get('/:id/delete',(req,res)=>{
        //menghapus data
        const {id}=req.params
        db.connect(()=>{
            const sql= `delete from mahasiswa where id=${id}`
            db.query(sql,(err)=>{
                if (err) throw err
                res.redirect('/')
            })
        })
        
    })
    
app.listen(5000,()=>{
    console.log('Berhasil Dijalankan')
})