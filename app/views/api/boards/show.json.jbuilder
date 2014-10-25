# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

# json.(@board, :title, :user_id)
#
# # json.lists @board.lists, :title
#
# json.lists @board.lists do |list|
#   json.title list.title
#   json.id list.id
#   json.cards list.cards, :title
# end

json.extract! @board, :id, :title, :created_at, :updated_at

json.members @board.members do |member|
  json.id member.id
  json.email member.email
  json.gravatar_url member.gravatar_url
end

json.lists @board.lists do |list|
  json.extract! list, :id, :title, :ord, :created_at, :updated_at

  json.cards list.cards do |card|
    json.extract! card, :id, :title, :ord, :created_at, :updated_at
  end
end

