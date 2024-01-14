class Messg < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :reciever, class_name: 'User'
  # has_many_attached :images # for images
  before_save :validate_sender_is_not_reciever
  after_create_commit :broadcaster
  # validates :message, presence: true, unless: -> { images.present? }

  def broadcaster
    ActionCable.server.broadcast(reciever_id, broadcast_data)
    ActionCable.server.broadcast(sender_id, broadcast_data)
  end

  def broadcast_data
    { message:, sender_id:, reciever_id:, images: }
  end

  def validate_sender_is_not_reciever
    return unless sender_id == reciever_id

    raise ArgumentError, 'Sender and Reciever should be different'
  end

  def self.image_url(images, url)
    upload_file_urls = []
    images.map do |image|
      content = Base64.encode64(image.read) # Encoding into Base64 because for sidekiq
      uploaded_file_url = "#{url}/uploads/#{image.original_filename}"
      upload_file_urls << uploaded_file_url
      ImageProcessingJob.perform_async(image.original_filename, content) # running sidekiq for writing image
    end
    upload_file_urls
  end

  def self.find_messages(sender, receiver)
    users = [sender, receiver]
    where(sender_id: users, reciever_id: users).order(created_at: :asc)
  end
end
