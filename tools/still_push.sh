#!/bin/sh
# still_push.sh <still.png> <out.mp4> [fx fy] : 8 s ping-pong slow push-in on a still (1920x1080, no audio)
FX=${3:-0.5}; FY=${4:-0.5}
ffmpeg -v error -y -i "$1" -filter_complex "[0:v]scale=3840:-2,zoompan=z='1+0.07*on/96':x='(iw-iw/zoom)*$FX':y='(ih-ih/zoom)*$FY':d=96:s=1920x1080:fps=24,format=yuv420p,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]" -map "[v]" -an -c:v libx264 -crf 24 -preset slow -movflags +faststart "$2"
