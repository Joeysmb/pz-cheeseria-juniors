import { Console } from 'console';
import * as express from 'express';
import {readFile, writeFile} from "fs";
const cheeses = require('./data/cheeses.json');

type item = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    amount?: number;
};

type itemArr = item[];

// const newItems = [
//     {
//         "id": 1,
//         "title": "ABBAYE DE BELLOC",
//         "price": 109.95,
//         "description": "Abbaye de Belloc is a flat wheel-shaped traditional, farmhouse, unpasteurised, semi-hard cheese made from sheep's milk. It has a natural, crusty, brownish rind with patches of red, orange and yellow. The rind is marked with tiny craters.",
//         "category": "creamy, dense and firm",
//         "image": "https://www.cheese.com/media/img/cheese/Abbaye-de-Belloc.jpg"
//     },
//     {
//         "id": 2,
//         "title": "ABBAYE DU MONT DES CATS",
//         "price": 29.21,
//         "description": "The Abbaye du Mont des Cats cheese is made by monks in a monastery of the same name in the town of Godewaersvelde, in Northern France. Cow's milk from local farms is used and the milk is gently pasteurised for cheese production. The maturation process takes about 4 to 5 weeks",
//         "category": "semi-soft, artisan, brined",
//         "image": "https://www.cheese.com/media/img/cheese/Mont_des_Cats_kaas.jpg"
//     },
//     {
//         "id": 3,
//         "title": "ADELOST",
//         "price": 367.55,
//         "description": "Adelost is a Swedish blue cheese made from cow's milk. The blue-grey veins running throughout are a distinctive feature of the cheese. It has a sharp, salty and tangy flavour. The ripening process is for two to three months. The cheese comes in a drum shape with a rind of pale cream, which is lightly dotted with moulds.",
//         "category": "semi-soft, blue-veined",
//         "image": "https://www.cheese.com/media/img/cheese/Adelost_QnxYLx6.jpg"
//     }
// ]

const app = express();
app.use(express.static("./public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//const router = express.Router();

app.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

app.post("/api/store", (req, res, next) => {
    let newItems: itemArr = req.body;
    readFile('./src/server/data/recentPurchases.json', "utf-8", (err, oldItems)=>{
        if(err){
            console.log("Unable to read file - ERROR: " + err);
            return err
        }
        try {
            let OldItemsjson: itemArr = JSON.parse(oldItems);

            for(let i=0; i<newItems.length; i++){
                let wasPurchasedRecently = false;
                for(let j=0; j<OldItemsjson.length; j++){
                    if(newItems[i].id === OldItemsjson[j].id){
                        wasPurchasedRecently = true;
                        break;
                    }
                }
                wasPurchasedRecently ? null : OldItemsjson.push(newItems[i])
            }

            const allPurchasedItemsjson = [...OldItemsjson];
            let allPurchasedItemsString = JSON.stringify(allPurchasedItemsjson, null, 2)

            writeFile('./src/server/data/recentPurchases.json', allPurchasedItemsString, (err)=>{
                if(err){
                    console.log("Unable to read file - ERROR: " + err);
                }else{
                    console.log("File wrote successfully");
                }
            })
        } catch (error) {
            console.log("An Error occured ")
        }
    })


    console.log("Request just hit the server")
    console.log(req.body)
    res.json({
        status: "Successful",
        Message: "Thank you for shopping Cheeseria cheese"
    })
});
export default app;


