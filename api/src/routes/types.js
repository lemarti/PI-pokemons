
const axios = require("axios");
const {Router}=require("express");
 const {Tipo}=require("../db");
const router=Router();
/* GET /types:
Obtener todos los tipos de pokemons posibles
En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí */
router.get("",async(req,res)=>{
    try {
        const promiseDB=await Tipo.findAll({      //devuelve tabla como arr obj
            attributes:['Nombre'],
           
        })
        
        if(promiseDB.length===0){
            
              const dataAPI=await axios.get("https://pokeapi.co/api/v2/type")
            
           const formatData=dataAPI.data.results.map(type=>{return {Nombre:type.name}}) 
        
          let tipo=await Tipo.bulkCreate(formatData)
          res.send(tipo)
        }
        else{
            res.send(promiseDB) 
        }
        
    } catch (error) {
        console.log(error)
    }



})

module.exports=router