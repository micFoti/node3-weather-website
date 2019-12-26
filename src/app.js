const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode  = require('./utiles/geocode.js')
const forecast  = require('./utiles/forecast.js')
 
const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, "../templates/partials")
//setup handlebars engine and views location
 app.set("views", viewpath)
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialpath)


//setup static directory to serve
app.get('/about', (req, res)=>{
  res.render('about',{title:'About', name:'micheleFoti'})

  })

  app.get('/help', (req, res)=>{
    res.render('help',{message:'Learning node js',title:'Help', name:'micheleFoti' })
  
    })


  app.get('', (req, res)=>{
    res.render('index',{title:'Weather app', name:'michele'})
  
    })
app.get('/help', (req, res)=>{
  res.send([{name:"Michele", age:37}, {name:'MicheleFoti'}])
  })

app.get('/about', (req, res)=>{
    res.send('<h1>About</h1>')
    })

app.get('/Weather', (req, res)=>{
      if(!req.query.address){
        return res.send({error:"you mast provide an address"})  
       }
       geocode(req.query.address, (error, {latitudes,longitudes, location}= {}) => {
        if (error){
         return  res.send({message:error, title:'Error 404'})

        }
        forecast(latitudes, longitudes, (error, forecast) => {
          if (error){
      
            return res.send({error})  
          }
         return res.send({location, address: req.query.address, forecast})  


       }
        )}

     ) })
        
        
        
        
       
     


      //  app.get('/product', (req, res)=>{ 
      //   console.log(req.query.search)
      //     if(!req.query.search){
      //      return res.send({error:"you mast provide a serch term"})  

      //     }
      //   res.send([{products:[]}])
      // })


       app.get('/help/*', (req, res)=>{
        res.render('error404',{message:'help article not found',title:'Error 404', name:'michele'})


      })
 
      app.get('*', (req, res)=>{
        res.render('error404',{message:'page not found',title:'Error 404', name:'michele'})
        })
app.listen(3000, ()=>{
console.log('Server is up on port 3000')

})