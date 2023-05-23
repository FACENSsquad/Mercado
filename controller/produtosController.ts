import { Request, Response } from "express";
import Produto from "../src/database/produtos";
import produtos from "../src/database/produtos";

class produtosController {

    async find(request: Request, response: Response){

        try{

            const produtos = await Produto.find();
            return response.json(produtos);

        }catch(error){
            return response.status(500).json({
                error: 'Something wrong happened, try again',
                message: error,
            })
        }
    }

    async create(request: Request, response: Response){
        const {name, price} = request.body;



            const produtos = await Produto.create({
                name,
                price
            });
            return  response.json(produtos);

            
        
            };
            }
        
    

export default new produtosController;