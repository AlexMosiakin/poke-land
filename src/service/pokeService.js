import axios from "axios";

export default class pokeService{
    static async getAllPoke(offset, limit){
        try {
            const responce = await axios.get(`https://pokeapi.co/api/v2/pokemon/`,{
                params: {
                    offset,
                    limit
                }
            });
            return responce;
        } catch (error) {
            console.log(error);
        }
    }

    static async getCurrentPoke(url){
        try {
            const responce = await axios.get(`${url}`);
            return responce;
        } catch (error) {
            console.log(error);
        }
    }

    static async getPokeById(id){
        try {
            const responce = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return responce;
        } catch (error) {
            console.log(error);
        }
    }
    
}