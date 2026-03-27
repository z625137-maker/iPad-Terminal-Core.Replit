#!/bin/bash
USER_DIR="user_space_tmp"

rm -rf $USER_DIR

mkdir -p $USER_DIR
tar -xzf alpine-rootfs.tar.gz -C $USER_DIR

cp /etc/resolv.conf $USER_DIR/etc/resolv.conf

echo "[LOG] Phoenix System: Alpine is Reborn."
