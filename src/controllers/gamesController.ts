import pool from '../database';
import {Request, Response} from 'express';
class GamesController{
    

    public async list (req: Request, res: Response){
        const games = await pool.query('SELECT * FROM games', [req.body])
        res.json(games)
    }

    public async getOne (req: Request, res: Response){
        const {id} = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id])
        if (games.length > 0){
            return res.json(games[0])
        }
        res.status(404).json({text: "error"})
    }

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO games set ?', [req.body])
        res.json({text: "create a game"});
    }

    public async delete (req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id])
        res.json({message: "succesful"});
    }

    public async update (req: Request, res: Response){
        const {id} = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body,id])
        res.json({message: "succesful change"});
    }
}

export const gamesController = new GamesController();