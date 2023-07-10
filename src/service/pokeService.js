import axios from "axios";

export default class pokeService {
  static async getAllPoke(offset, limit) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, {
        params: {
          offset,
          limit,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getCurrentPoke(url) {
    try {
      const response = await axios.get(`${url}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPokeById(id) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPokeSpeciesById(id) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPokeSpeciesByUrl(url) {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPokeEvolutionByChainUrl(url) {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
