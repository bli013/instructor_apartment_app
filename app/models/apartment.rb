class Apartment < ApplicationRecord
    belongs_to :user
    validates :street, :city, :state, :zipcode, :country, presence: true
end
