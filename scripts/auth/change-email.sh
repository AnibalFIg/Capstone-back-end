#!/bin/bash

API="http://localhost:4741"
URL_PATH="/change-email"

curl "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "user": {
      "user_id": "'"${ID}"'",
      "email": "'"${EMAIL}"'"
    }
  }'

echo
