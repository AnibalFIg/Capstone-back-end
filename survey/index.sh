API="http://localhost:4741"
URL_PATH="/myblogs"

curl "${API}${URL_PATH}" \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" | json_pp

echo
