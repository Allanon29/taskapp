class Task < ApplicationRecord

    validates :name, presence: true
    validates :scheduled_at, presence: true

end
