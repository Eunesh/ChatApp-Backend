class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token # For allowing cross site
end
