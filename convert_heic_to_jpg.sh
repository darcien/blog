#!/bin/bash

input_dir="$1"

if [[ -z "$input_dir" ]]; then
  echo "Please specify an input directory."
  exit 1
fi

# https://imagemagick.org/script/convert.php
for img in $(find $input_dir -type f \( -iname "*.HEIC" \)); do
  echo converting $img to jpg
  convert $img -set filename:f '%t' $input_dir/'%[filename:f].jpg'
done
