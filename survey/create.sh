#!/bin/bash

API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "survey": {
      "title": "some title",
      "description" : "some description to some title",
      "owner":  "'"${OWNERID}"'",
      "blog_content": [
          {
            "question": "q1",
            "input_type":"radio",
            "choices": ["0", "1"]
          },
          {
            "question":"What is your name?",
            "input_type": "text"
          }
        ]
    }
  }'

echo
