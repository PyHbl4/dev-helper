#!/bin/bash
set -e

echo "🔄 Running maintenance script..."

# --- Обновление Node / Rust зависимостей ---
echo "📦 Ensuring Node and Rust dependencies are up to date..."
pnpm install --frozen-lockfile || pnpm install
echo "✅ Node dependencies updated."

# --- Rust crates (в src-tauri) ---
if [ -f "src-tauri/Cargo.toml" ]; then
  echo "🦀 Fetching Rust crates..."
  (cd src-tauri && cargo fetch) || echo "⚠️  Failed to fetch Rust crates."
else
  echo "⚠️  Cargo.toml not found in src-tauri, skipping Rust fetch."
fi

# --- Обновление базы знаний ---
if [ -d "_knowledge/.git" ]; then
  echo "📚 Updating helper-docs repository..."
  cd _knowledge
  git pull --ff-only || echo "⚠️  Failed to pull latest documentation."
  cd ..
else
  echo "⚠️  Documentation repository not found, skipping update."
fi

echo "✅ Maintenance complete."
