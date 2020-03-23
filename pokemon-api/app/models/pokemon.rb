class Pokemon < ApplicationRecord
  has_many :moves
  belongs_to :team
end
