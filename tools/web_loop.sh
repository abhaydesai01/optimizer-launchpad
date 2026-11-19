#!/bin/sh
# web_loop.sh <clip.mp4> <out.mp4> : 4 s seamless crossfade loop, 1920 wide, no audio
ffmpeg -v error -y -i "$1" -filter_complex "[0:v]split[x][y];[x]trim=1:5,setpts=PTS-STARTPTS,fps=24,settb=AVTB[a];[y]trim=0:1,setpts=PTS-STARTPTS,fps=24,settb=AVTB[b];[a][b]xfade=transition=fade:duration=1:offset=3,scale=1920:-2,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -crf 25 -preset slow -movflags +faststart "$2"
