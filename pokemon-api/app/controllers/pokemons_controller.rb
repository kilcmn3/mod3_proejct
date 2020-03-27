class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, include: [:moves], except: [:created_at, :updated_at]
        
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json:  pokemon, except: [:created_at, :updated_at], include: [:moves]
    end
end
