class Messg < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :reciever, class_name: 'User'
  after_create_commit :broadcaster
  validates :message, presence: true

  def broadcaster
    ActionCable.server.broadcast(reciever_id, { message: })
  end

  def self.find_messages(sender, receiver)
    users = [sender, receiver]
    where(sender_id: users, reciever_id: users).order(created_at: :asc)
  end
end
