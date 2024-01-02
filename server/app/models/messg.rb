class Messg < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :reciever, class_name: 'User'

  after_create_commit :broadcaster

  def broadcaster
    ActionCable.server.broadcast("chat_#{recipient_id}", '')
    ActionCable.server.broadcast("chat_#{recipient_id}#{sender_id}", message)
  end
end
