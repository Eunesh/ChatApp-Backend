class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    return unless current_user

    stream_from current_user.id # for every specific login user

    # stream_from 'appearance_channel' # channel for everyone for online users

    # ActionCable.server.broadcast('appearance_channel', { user: current_user.id, online: true}) # Broadcasting in appearance channel for active users

    current_user.update!(online: true)
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
    # ActionCable.server.broadcast('appearance_channel', { user: current_user.id, online: false, koko: true })
    current_user.update!(online: false)
  end
end
