class TeamsController < ApplicationController
    def index
        teams = Team.all 
        render json: teams, except: [:created_at, :updated_at], include: [:pokemons, :moves]
    end

    def show
        team = Team.find(params[:id])
        render json: team, except: [:created_at, :updated_at], include: [:pokemons, :moves]
    end

    def update
        team = Team.find(params[:id])
        team.update(team_params)
    end

    private

    def team_params
        params.require(:team).permit(:wins, :losses)
    end
end


