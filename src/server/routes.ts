import { Console } from 'console';
import * as express from 'express';
import {readFile, writeFile} from "fs";
const cheeses = require('./data/cheeses.json');

//Setting the type for each purchased item
type item = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    amount?: number;
};

//Setting the type for the purchased item collection
type itemArr = item[];
type purchasesArr = [item[]];

const app = express();
app.use(express.static("./public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//const router = express.Router();

app.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

app.post("/api/storeCheckout", (req, res, next) => {
    let newItems: itemArr = req.body;

    //Get the stored items
    readFile('./src/server/data/recentPurchases.json', "utf-8", (err, oldItems)=>{
        if(err){
            res.send("Checkout was not successful")
            console.log("Unable to read file - ERROR: " + err);
            return err
        }
            //Convert retrieved items to JSON
            let OldPurchasesjson: purchasesArr = JSON.parse(oldItems);
             
            let itemsWithoutAmount : itemArr = [];
            for(let i=0; i<newItems.length; i++){
                let obj = newItems[i];
                itemsWithoutAmount.push({
                    "id": obj.id, 
                    "title": obj.title, 
                    "price": obj.price, 
                    "description": obj.description, 
                    "category": obj.category, 
                    "image": obj.image
                })
            }
            //Storing newer items at the on top of the list to ensure last in first out
            OldPurchasesjson.unshift(itemsWithoutAmount)
            const allPurchasedItemsjson = [...OldPurchasesjson];
            let allPurchasedItemsString = JSON.stringify(allPurchasedItemsjson, null, 2)

            writeFile('./src/server/data/recentPurchases.json', allPurchasedItemsString, (err)=>{
                if(err){
                    res.json({
                        status: "Checkout was not successful",
                        message: err
                    })
                    console.log("Unable to read file - ERROR: " + err);
                    return err
                }else{
                    res.json({
                        status: "Checkout was Successful",
                        message: "Thank you for shopping Cheeseria cheese"
                    })
                } 
            }) //writefile
        }); //readfile

});

app.get("/api/recentlyPurchasedItems", (req, res, next) => {
    readFile('./src/server/data/recentPurchases.json', "utf-8", (err, data)=>{
        if(err){
            console.log(err);
            return res.json({"error": "Something went wrong. " + err});
        }

            const oldPurchasedItems: purchasesArr = JSON.parse(data);
            var recentlyPurchasedItems: itemArr = []; //Container for most recent items
            //Iterate through the previous orders
                for(let i=0; i<oldPurchasedItems.length; i++){
                    let order = oldPurchasedItems[i];
                  for(let j=0; j<order.length; j++){
                      //Is this item is already in the list of recently purchased items?
                      if(JSON.stringify(recentlyPurchasedItems).includes(JSON.stringify(order[j]))){
                          continue;
                          //Return only the 5 most recent items 
                      }else if(recentlyPurchasedItems.length >= 5){
                        return res.json(recentlyPurchasedItems);
                      }
                      recentlyPurchasedItems.push(order[j]);
                  }
              }

            return res.json(recentlyPurchasedItems);
    });
});
export default app;


