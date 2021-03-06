# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
include Sprig::Helpers

p "Destroying Experiences"
Experience.destroy_all
p "Destroying Projects"
Project.destroy_all
p "Destroying Skills"
Skill.destroy_all
p "Destroying Comments"
Comment.destroy_all
p "Destroying Screenshots"
Screenshot.destroy_all

sprig_shared [Experience, Project, Skill, Comment]
