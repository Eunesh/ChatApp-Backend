# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_05_185122) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messgs", force: :cascade do |t|
    t.text "message"
    t.bigint "sender_id", null: false
    t.bigint "reciever_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reciever_id"], name: "index_messgs_on_reciever_id"
    t.index ["sender_id"], name: "index_messgs_on_sender_id"
  end

  create_table "otps", force: :cascade do |t|
    t.string "otp_key"
    t.datetime "expired_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "confirmed_at"
    t.index ["email"], name: "index_users_on_email"
  end

  add_foreign_key "messgs", "users", column: "reciever_id"
  add_foreign_key "messgs", "users", column: "sender_id"
end
