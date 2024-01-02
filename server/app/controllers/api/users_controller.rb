class Api::UsersController < ApplicationController
  # Emty method for views
  def home; end

  # GET /users
  def index
    @user = User.all
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: 'User is not created sucessfully', status: :conflict
    end
  end

  # GET  /users/new
  def new
    @user = User.new
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
