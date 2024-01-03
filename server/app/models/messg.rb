class Messg < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :reciever, class_name: 'User'

  after_create_commit :broadcaster

  def broadcaster
    ActionCable.server.broadcast(reciever_id, { message: })
  end

  def self.find_messages(sender, receiver)
    Messg.where(sender_id: sender, reciever_id: receiver).order(created_at: :asc)
  end
end
