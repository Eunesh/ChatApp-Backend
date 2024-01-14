class MessgSerializer < ActiveModel::Serializer
  attributes :id, :message, :sender_id, :reciever_id, :images

  # include Rails.application.routes.url_helpers

  # def image_urls
  #   object.images.map do |image|
  #     rails_blob_path(image, only_path: true)
  #   end
  # end
end
