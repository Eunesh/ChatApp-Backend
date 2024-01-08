class Api::MessagesController < ApplicationController
  before_action :authenticate_user, only: %i[create_message]
  # Post /create_message
  def create_message
    @message = Messg.new(message_params)

    if @message.save
      render json: @message, status: :created
    else
      render json: { message: 'Message is not created successfully' }, status: :not_implemented
    end
  end

  # GET /specific_message/:sender/:receiver
  def specific_message
    messages = Messg.find_messages(params[:sender], params[:receiver])
    render json: messages, status: :ok
  end

  private

  def message_params
    params.permit(:message, :sender_id, :reciever_id, :image)
  end
end
