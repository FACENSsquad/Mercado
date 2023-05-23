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

        try {
            const vereficacao = await produtos.findOne({ name, price});

            if (!name){
                return response.status(400).json({
                    error: "Os campos são obrigatórios"
                });
            }


            const Produto = await produtos.create({
                name,
                price
            });
            return  response.json(produtos);

            
        } catch (error) {
                return response.status(500).send({ 
                     error: 'Registration failed',
                     message: error
            });
            }
        }
    }

export default new produtosController;