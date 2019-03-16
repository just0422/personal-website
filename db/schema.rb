# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_16_211205) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "experience_id"
    t.index ["experience_id"], name: "index_comments_on_experience_id"
    t.index ["project_id"], name: "index_comments_on_project_id"
  end

  create_table "experiences", force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.datetime "start"
    t.datetime "end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rank"
  end

  create_table "experiences_skills", id: false, force: :cascade do |t|
    t.bigint "experience_id", null: false
    t.bigint "skill_id", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "start"
    t.datetime "end"
    t.string "demo_link"
    t.string "github_link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rank"
  end

  create_table "projects_skills", id: false, force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "skill_id", null: false
  end

  create_table "screenshots", force: :cascade do |t|
    t.string "title"
    t.text "image_data"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_screenshots_on_project_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.integer "years"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comments", "experiences"
  add_foreign_key "comments", "projects"
  add_foreign_key "screenshots", "projects"
end
