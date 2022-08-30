const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");
const router = Router();
let stats = [];

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id.includes("-")) {
      const promiseDB = await Pokemon.findbyPk(id, {
        attributes: [
          "Nombre",
          "Vida",
          "Ataque",
          "Defensa",
          "Velocidad",
          "Altura",
          "Peso",
        ],
        include: {
          model: Tipo,
          attributes: ["Nombre"],
          through: { attributes: [] },
        },
      });
      res.send(promiseDB);
    } else {
      const dataAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      stats = dataAPI.data.stats.filter(({ stat }) => {
        return (
          stat.name === "hp" ||
          stat.name === "attack" ||
          stat.name === "defense" ||
          stat.name === "speed"
        );
      });

      let mystats = stats.map(({ base_stat, stat }) => ({
        [stat.name]: base_stat,
      }));

      let types = dataAPI.data.types.map((el) => {
        return el.type.name;
      });

      const pokemon = {
        Nombre: dataAPI.data.forms[0].name,
        Peso: dataAPI.data.weight,
        Altura: dataAPI.data.height,
        ID: dataAPI.data.id,
        Imagen: dataAPI.data.sprites.front_default,
        Vida: mystats[0],
        Ataque: mystats[1],
        Defensa: mystats[2],
        Velocidad: mystats[3],
        Tipo: types,
      };
      res.send(pokemon);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("", async (req, res) => {
  try {
    let { Nombre } = req.query;

    if (Nombre && Nombre !== "") {
      let promiseDB = await Pokemon.findAll({
        where: { Nombre: { [Op.like]: `${Nombre}` } },
        include: {
          model: Tipo,
          attributes: ["Nombre"],
          through: { attributes: [] },
        },
      });

      if (promiseDB.length > 0) {
        return res.send(promiseDB);
      }

      let promiseAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${Nombre}`
      );

      if (promiseAPI.data) {
        //formateamos data de la api

        let { forms, stats, weight, height, types, id, sprites } =
          promiseAPI.data;

        const pokemon = {
          id,
          Nombre: forms[0].name,
          Peso: weight,
          Altura: height,
          Imagen: sprites.front_default,
          Vida: stats.filter((stat) => stat.stat.name === "hp").base_stat,
          Ataque: stats.filter((stat) => stat.stat.name === "attack").base_stat,
          Defensa: stats.filter((stat) => stat.stat.name === "defense")
            .base_stat,
          Velocidad: stats.filter((stat) => stat.stat.name === "speed")
            .base_stat,
          Tipo: types.map(({ type }) => {
            return type.name;
          }),
        };
        res.send(pokemon);
      }
    } else {
      const promiseAPI = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=40"
      );
      let links = promiseAPI.data.results.map((el) => {
        return el.url;
      });

      Promise.all(
        links.map((link) => {
          return axios.get(link);
        })
      ).then((value) => {
        let dataAPI = value.map((valuepokemon) => {
          return valuepokemon.data;
        });

        let pokemonsAPI = dataAPI.map(
          
          ({ id, name, weight, height, sprites, stats, types }) => ({
            ID: id,
            Nombre: name,
            Peso: weight,
            Altura: height,
            Imagen: sprites.front_default,
            Vida: stats.find((e) => e.stat.name === "hp").base_stat,
            Ataque: stats.find((e) => e.stat.name === "attack").base_stat,
            Defensa: stats.find((e) => e.stat.name === "defense").base_stat,
            Velocidad: stats.find((e) => e.stat.name === "speed").base_stat,
            Tipo: types.map(({ type }) => {
              return type.name;
            }),
          })
        );
        
        const GetPokesDB = async () => {
          return await Pokemon.findAll({
            include: {
              model: Tipo,
              attributes: ["Nombre"],
              through: { attributes: [] },
            },
          });
        };
        const GetAllPokes=async()=>{
          const PokesDB=await GetPokesDB();
          const allPokes=pokemonsAPI.concat(PokesDB)
          res.send(allPokes)
        }
        GetAllPokes();
        
        //value contiene arr value promesas
      });
    }
  } catch (error) {
    res.send("ups, not found! key sensitive");
    console.log(error);
  }
});
router.post("", async (req, res) => {
  try {
    let {
      Nombre,
      Tipos,
      Altura,
      Peso,
      Vida,
      Ataque,
      Defensa,
      Velocidad,
      Img,
      CreadoenDB
    } = req.body;
    if (
      !Nombre ||
      !Vida ||
      !Ataque ||
      !Defensa ||
      !Velocidad ||
      !Altura ||
      !Peso
    ) {
      return res.send("todos los campos son obligatorios");
    };
    const existe = await Pokemon.findOne({
      where: { Nombre: req.body.Nombre },
    });

    if (existe) return res.send("el pokemon que intenta crear ya existe");
   
    
    let newPokemon = await Pokemon.create({
      Imagen:Img?Img:"nottoday",
      Nombre,
      Altura,
      Peso,
      Vida,
      Ataque,
      Defensa,
      Velocidad,
      CreadoenDB
    });

    for (let i = 0; i < Tipos.length; i++) {
      let tipo = await Tipo.findAll({ where: { Nombre: Tipos[i] } });
      newPokemon.addTipo(tipo);
    }
    res.send("creado con éxito!!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
