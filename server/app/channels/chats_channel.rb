class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from params[:reciever_id]
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
