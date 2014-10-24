# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :title, :user_id)

# json.lists @board.lists, :title

json.lists @board.lists do |list|
  json.title list.title
  json.id list.id
  json.cards list.cards, :title
end
