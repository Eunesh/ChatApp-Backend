class Messg < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :reciever, class_name: 'User'
  has_one_attached :image # for image
  after_create_commit :broadcaster
  validates :message, presence: true, unless: -> { image.present? }

  def broadcaster
    ActionCable.server.broadcast(reciever_id, { message:, image: serialize })
    # ActionCable.server.broadcast(reciever_id, { image: serialize })
  end

  def serialize
    MessgSerializer.new(self)
  end

  def self.find_messages(sender, receiver)
    users = [sender, receiver]
    where(sender_id: users, reciever_id: users).order(created_at: :asc)
  end
end
