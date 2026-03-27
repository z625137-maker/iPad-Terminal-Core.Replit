!/bin/bash
USER_DIR="/tmp/alpine_guest"
TARBALL="/home/runner/workspace/core/alpine.tar.gz"

rm -rf "$USER_DIR"
mkdir -p "$USER_DIR"
tar -xzf "$TARBALL" -C "$USER_DIR"
chmod +x "$USER_DIR/bin/busybox"
ln -sf busybox "$USER_DIR/bin/sh"
echo "[LOG] Power: Alpine Ready at /tmp."
