class User < ApplicationRecord

  validates :name, :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, :session_token, uniqueness: true

  has_attached_file :image, default_url: "logo.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  attr_reader :password

  after_initialize :generate_session_token

  has_many :listings
  has_many :reviews

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def generate_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end
