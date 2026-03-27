#!/bin/bash
USER_DIR="/tmp/alpine"

proot -0 -r "$USER_DIR" \
      -b /dev:/dev -b /proc:/proc -b /sys:/sys \
      -b /etc/resolv.conf:/etc/resolv.conf \
      -b /home/runner/workspace/core:/mnt/core:ro \
      -w /root \
      /bin/sh
