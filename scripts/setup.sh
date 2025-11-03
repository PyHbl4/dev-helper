#!/bin/bash
set -e

echo "🚀 Starting environment setup..."

# --- Настройка SSH для GitHub Deploy Key (если используется) ---
if [ -n "$GIT_SSH_PRIVATE_KEY" ]; then
  echo "🔐 Setting up SSH key..."
  mkdir -p ~/.ssh
  echo "$GIT_SSH_PRIVATE_KEY" > ~/.ssh/id_ed25519
  chmod 600 ~/.ssh/id_ed25519
  ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null || true
fi

# --- Установка Node + pnpm + Rust ---
echo "📦 Installing Node, pnpm, and Rust toolchain..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1 || true
apt-get install -y nodejs pkg-config libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev >/dev/null 2>&1

# --- Установка webkit2gtk для Tauri GUI ---
echo "🧩 Installing webkit2gtk-4.1 (Tauri GUI dependency)..."
apt-get install -y webkit2gtk-4.1 >/dev/null 2>&1 || {
  echo "⚠️  Failed to install webkit2gtk-4.1 — GUI may not work."
}

npm install -g pnpm@9 >/dev/null 2>&1
curl https://sh.rustup.rs -sSf | sh -s -- -y >/dev/null 2>&1
source $HOME/.cargo/env

# --- Настройка окружения ---
echo "⚙️  Configuring environment variables..."
export CARGO_TERM_COLOR=always
export PATH="$HOME/.cargo/bin:$PATH"

# --- Установка зависимостей проекта ---
echo "📦 Installing project dependencies..."
pnpm install --frozen-lockfile || pnpm install

# --- Клонирование базы знаний ---
echo "📚 Fetching documentation repository..."
mkdir -p _knowledge
cd _knowledge

if [ -n "$KNOWLEDGE_TOKEN" ]; then
  echo "→ Using HTTPS + token"
  git clone https://"$KNOWLEDGE_TOKEN"@github.com/PyHbl4/helper-docs.git . || echo "⚠️  Failed to clone via token"
elif [ -n "$GIT_SSH_PRIVATE_KEY" ]; then
  echo "→ Using SSH + deploy key"
  git clone git@github.com:PyHbl4/helper-docs.git . || echo "⚠️  Failed to clone via SSH"
else
  echo "⚠️  No documentation access credentials found, skipping clone."
fi

cd ..

# --- Проверка Rust и Tauri ---
echo "🦀 Checking Rust and Tauri setup..."
cargo --version || echo "⚠️  Cargo not found"
pnpm tauri info || echo "⚠️  Tauri CLI not found"

echo "✅ Setup complete."
