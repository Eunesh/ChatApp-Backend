class Api::MessagesController < ApplicationController
  before_action :authenticate_user, only: %i[create specific_message]
  # Post /create
  def create
    image_urls = Messg.image_url(params[:images], request.base_url) if params[:images].present?
    @message = Messg.new(message_params.merge(images: image_urls))
    # puts params[:images]
    if @message.save
      render json: @message, status: :created
    else
      render json: { message: 'Message is not created successfully' }, status: :not_implemented
    end
  end

  # GET /specific_message/:sender/:receiver
  def specific_message
    # includes(images_attachments: :blob) for eager loading images
    messages = Messg.find_messages(params[:sender], params[:receiver])
    render json: messages, status: :ok
  end

  private

  def message_params
    params.permit(:message, :sender_id, :reciever_id)
  end
end
