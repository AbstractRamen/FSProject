class Listing < ApplicationRecord

  validates :user_id, :address, :name, presence: true

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  belongs_to :user

end
