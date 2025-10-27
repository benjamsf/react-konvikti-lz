#!/usr/bin/env bash
set -e

PORT=22001
INPUT_MD="src/decks"
OUTPUT_NONMONO="src/assets/decks-nonmonolith"
OUTPUT_MONO="src/assets/decks"
TMP_PREVIEW_ROOT=".reveal-preview-tmp"
TMP_MONO_OUT=".monolith-temp-out"

echo "📦 Building decks with reveal.build.js..."
node reveal.build.js

echo "🧹 Cleaning previous monolith outputs in $OUTPUT_MONO..."
rm -rf "$OUTPUT_MONO"
mkdir -p "$OUTPUT_MONO"

echo "📁 Ensuring all nonmonolith decks exist..."
[ ! -d "$OUTPUT_NONMONO" ] && { echo "❌ No nonmonolith decks found."; exit 1; }

echo "📁 Copying nonmonolith decks to $TMP_PREVIEW_ROOT for preview..."
rm -rf "$TMP_PREVIEW_ROOT"
mkdir -p "$TMP_PREVIEW_ROOT"
cp -r "$OUTPUT_NONMONO"/* "$TMP_PREVIEW_ROOT/"

echo "📄 Creating preview server..."
node <<EOF &
const express = require('express');
const app = express();
const port = $PORT;
app.use(express.static('$TMP_PREVIEW_ROOT'));
app.listen(port, () => console.log('🚀 Static server running on port $PORT'));
EOF
PREVIEW_PID=$!

echo "⏳ Waiting for http://localhost:$PORT..."
until curl -s "http://localhost:$PORT" > /dev/null; do
  sleep 1
  printf "."
done
echo " ✅"

echo "🧼 Cleaning monolith temp output dir: $TMP_MONO_OUT"
rm -rf "$TMP_MONO_OUT"
mkdir -p "$TMP_MONO_OUT"

echo "🔍 Found built HTML decks in $OUTPUT_NONMONO..."
find "$OUTPUT_NONMONO" -name 'index.html' | while read -r html_file; do
  rel_path=${html_file#"$OUTPUT_NONMONO/"}
  dir_path=$(dirname "$rel_path")
  output_path="$TMP_MONO_OUT/$dir_path/index.html"
  url_path="/$rel_path"
  url="http://localhost:$PORT$url_path"

  echo "📝 Found: $html_file"
  echo "📸 Exporting monolith via Puppeteer"
  echo "  URL:    $url"
  echo "  Output: $output_path"
  mkdir -p "$(dirname "$output_path")"

  node monolith-export.js "$url" "$output_path" || echo "❌ Failed to export $url"
done

echo "📁 Moving monoliths from $TMP_MONO_OUT → $OUTPUT_MONO"
rsync -a "$TMP_MONO_OUT/" "$OUTPUT_MONO/"

echo "🧹 Cleaning temp monolith output dir: $TMP_MONO_OUT"
rm -rf "$TMP_MONO_OUT"

echo "🛑 Stopping preview server (PID $PREVIEW_PID)"
kill $PREVIEW_PID
wait $PREVIEW_PID 2>/dev/null || true

echo "🧼 Cleaning up temporary preview root: $TMP_PREVIEW_ROOT"
rm -rf "$TMP_PREVIEW_ROOT"

echo "✅ All decks exported to $OUTPUT_MONO/*/.../index.html as monolithic files"
