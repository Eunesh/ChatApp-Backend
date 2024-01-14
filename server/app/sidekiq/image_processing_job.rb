class ImageProcessingJob
  include Sidekiq::Job

  def perform(image_name, content)
    decoded_content = Base64.decode64(content)
    uploaded_file_path = Rails.root.join('public', 'uploads', image_name)
    File.open(uploaded_file_path, 'wb') do |file|
      file.write(decoded_content)
    end
  end
end
