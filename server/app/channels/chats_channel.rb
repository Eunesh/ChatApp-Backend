class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    return unless current_user

    stream_from current_user.id

    current_user.update!(online: true)
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
    current_user.update!(online: false)
  end
end
