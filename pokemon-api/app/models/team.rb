class Team < ApplicationRecord
    has_many :pokemons
    has_many :moves, through: :pokemons
end
