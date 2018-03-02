import { Router } from 'express';
import mongoose from 'mongoose';
import Restaurant from '../model/restaurant';

export default ({ config, db }) => {

  let api = Router();

  // CRUD - Create Read Update Delete

  // '/v1/restaurant/add'  - Create
  api.post('/add', (req, res) => {
    let newRest = new Restaurant();
    newRest.name = req.body.name;

    newRest.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Restaurant saved Successfully' });
    });
  });

  // '/v1/restaurant' - Read => Read all the items
  api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if(err) {
        res.send(err);
      }
      res.json(restaurants);
    });
  });

  // '/v1/restaurant/{id}' - Read => Read specific the item
  api.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if(err) {
        res.send(err);
      }
      res.json(restaurant);
    });
  });


  // '/v1/restaurant/id' - Update
  api.put('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if(err) {
        res.send(err);
      }
      restaurant.name = req.body.name;
      restaurant.save(err => {
        if(err) {
          res.send(err);
        }
        res.json({ message: 'Restaurant info is updated successfully' });
      });
    });
  });

  // '/v1/restaurant/:id' - DELETE - remove a restaurant
  api.delete('/:id', (req, res) => {
    Restaurant.remove({ _id: req.params.id }, (err, restaurant) => {
      if (err) {
        res.send(err);
      }
      res.json({message: "Restaurant Successfully Removed"});
    });
  });


  return api;
} 