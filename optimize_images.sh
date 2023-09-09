#!/bin/bash

input_dir="$1"

if [[ -z "$input_dir" ]]; then
  echo "Please specify an input directory."
  exit 1
fi

# https://github.com/fhanau/Efficient-Compression-Tool
for img in $(find $input_dir -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \)); do
  echo optimizing sizes $img
  # -9 is the max optimization and is really slow
  # --mt-deflate for compression using multi-threading
  # -strip metadata
  # -keep for keep original modification time after compressing the image in place
  ect -9 --mt-deflate -strip -keep $img
done
