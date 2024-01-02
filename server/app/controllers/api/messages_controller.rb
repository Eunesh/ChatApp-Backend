class Api::MessagesController < ApplicationController
  # Post /create_message
  def create_message
    @message = Messg.new(message_paramps)
    if @message.save
      render json: { message: 'Message is created sucessfully' }, status: :created
    else
      render json: { message: 'Message is not created successfully' }, statis: :not_implemented
    end
  end

  def message_params
    params.permit(:message, :sender, :reciever)
  end
end
