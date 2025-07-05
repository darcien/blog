#!/bin/bash

input_dir="$1"

if [[ -z "$input_dir" ]]; then
  echo "Please specify an input directory."
  exit 1
fi

# Find and optimize PNG files with oxipng
# https://github.com/oxipng/oxipng
for img in $(find "$input_dir" -type f \( -iname "*.png" \)); do
  # -o max to use max optimization level
  # --strip safe removes metadata that doesn't affect image rendering
  # --preserve preserves file modification time
  oxipng -o max --strip safe --preserve "$img"
done

# Find and optimize JPEG files with jpegtran
for img in $(find "$input_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \)); do
  echo "Optimizing JPEG: $img"
  temp_file=$(mktemp)

  # -optimize enables optimization
  # -progressive creates progressive JPEG
  # -copy none removes metadata
  jpegtran -optimize -progressive -copy none -report -outfile "$temp_file" "$img"

  if [[ -s "$temp_file" ]]; then
    # Preserve the original file's modification time
    touch -r "$img" "$temp_file"
    mv "$temp_file" "$img"
  else
    echo "Warning: Failed to optimize $img"
    rm -f "$temp_file"
  fi
done
