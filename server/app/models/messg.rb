class Messg < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :reciever, class_name: 'User'
  has_many_attached :images # for images
  after_create_commit :broadcaster
  validates :message, presence: true, unless: -> { images.present? }

  def broadcaster
    ActionCable.server.broadcast(reciever_id, broadcast_data)
    ActionCable.server.broadcast(sender_id, broadcast_data)
  end

  def broadcast_data
    { message:, sender_id:, reciever_id:, image: serialize }
  end

  def serialize
    MessgSerializer.new(self)
  end

  def self.find_messages(sender, receiver)
    users = [sender, receiver]
    where(sender_id: users, reciever_id: users).order(created_at: :asc)
  end
end
