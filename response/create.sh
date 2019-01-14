#!/bin/bash

API="http://localhost:4741"
URL_PATH="/responses"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "response": {
      "responses": [
          {
            "q_index": "0",
            "answer":"some response"
          },
          {
            "q_index":"1",
            "answer": "some response"
          }
        ]
    }
  }'
