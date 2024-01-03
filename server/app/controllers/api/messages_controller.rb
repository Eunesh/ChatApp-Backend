class Api::MessagesController < ApplicationController
  # Post /create_message
  def create_message
    @message = Messg.new(message_params)
    if @message.save
      render json: @message, status: :created
    else
      render json: { message: 'Message is not created successfully' }, status: :not_implemented
    end
  end

  # GET /specific_message/:sender_id/:receiver_id
  def specific_message
    sender = params[:sender_id]
    receiver = params[:receiver_id]
    message = Messg.find_messages(sender, receiver)
    render json: message
  end

  def message_params
    params.permit(:message, :sender_id, :reciever_id)
  end
end
