const express = require('express');
const router = express.Router();

let restaurants = [];

router.get('/', (req, res) => {
    if(req.query.kindOfRestaurant){
        let sameKindOfRestaurants = [];
        restaurants.forEach(restaurant => {
            if(restaurant.kindOfRestaurant == req.query.kindOfRestaurant){
                sameKindOfRestaurants.push(restaurant);
            }
        })
        res.send(sameKindOfRestaurants);
    } else {
        res.send(restaurants)
    }
})

router.post('/', (req, res) => {
    let restaurant = {};
    
    // Validaciones de formato
    if(req.body.name){
        restaurant.name = req.body.name;
    }

    if(req.body.kindOfRestaurant){
        restaurant.kindOfRestaurant = req.body.kindOfRestaurant;
    }

    if(Array.isArray(req.body.songs)){
        restaurant.songs = req.body.songs;
    }

    if(restaurant.name && restaurant.kindOfRestaurant && restaurant.songs){
        if(restaurants.length > 0){
            let exists = false;
            restaurants.forEach(resto => {
                if(resto.name == restaurant.name){
                    exists = true;
                }
            });
            if(exists){
                res.status(400).send("Ya existe un restaurante con ese nombre.")
            } else {
                restaurants.push(restaurant);
                restaurant = {};
                res.status(201).send("Se ha creado satisfactoriamente.");
            }
        } else {
            restaurants.push(restaurant);
            restaurant = {};
            res.status(201).send("Se ha creado satisfactoriamente.");
        }
    } else {
        res.status(400).send("Por favor envíe un formato valido de datos para el restaurant (Nombre, tipo y canciones(array))")
    }
})

module.exports = router;