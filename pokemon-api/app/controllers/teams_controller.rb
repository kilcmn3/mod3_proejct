class TeamsController < ApplicationController
    def index
        teams = Team.all 
        render json: teams, except: [:created_at, :updated_at], include: [:pokemons, :moves]
    end

    def show
        team = Team.find(params[:id])
        render json: team, except: [:created_at, :updated_at], include: [:pokemons, :moves]
    end
end


