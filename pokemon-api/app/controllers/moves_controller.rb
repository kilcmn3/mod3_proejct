class MovesController < ApplicationController
    def index
        moves = Move.all 
        render json:  moves, except: [:created_at, :updated_at]
    end

    def show
        move = Move.find(params[:id])
        render json: move, except: [:created_at, :updated_at]
    end
end
