#!/bin/bash
USER_DIR="user_space_tmp"
MASTER_TAR="alpine-rootfs.tar.gz"

if [ ! -d "$USER_DIR" ]; then
    echo "[LOG] Deploying new Alpine for you..."
    mkdir -p $USER_DIR
    tar -xzf $MASTER_TAR -C $USER_DIR
fi


echo "[LOG] Welcome to index.dev's Fortress."

proot -0 -r $USER_DIR \
      -b /dev:/dev \
      -b /proc:/proc \
      -b /sys:/sys \
      -b /etc/resolv.conf:/etc/resolv.conf \
      -w /root \
      /bin/sh
