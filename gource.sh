TITLE="Tom Atkinson: Mission 5 part 1. Develop CLI tool to bulk load MongoDB"
FULLPATH="/home/tom/Dropbox/Sites/puppeteer.funk.nz/ChronicElectronicWebCrawler/video"
OUTPUTFILEMP4="video/mongo-cli.mp4"
OUTPUTFILEAUDIO="video/mongo-cli-audio.mp4"
# OUTPUTFILEAUDIO="video/fast_gource_audiologo.mp4"
# FASTOUTPUTFILEAUDIO="video/fast_gource_music.mp4"
# FASTOUTPUTFILEAUDIO="video/fast_gource_audiologo.mp4"
AUDIOTRACK="/home/tom/Documents/Unity/MrAccident/Assets/MrAccident/Audio/SoundFX/OriginalFoley/Feverish_Typing_On_The_Keyboard.wav"
# THIS LAST ABOUT A MINUTE
echo if audio is longer than you may addd -shortest
MONGOCLI="gource --date-format '%d / %m / %Y %a' --camera-mode overview -1600x1040 --seconds-per-day 2.0 --auto-skip-seconds 0.5 --max-file-lag 0.6 --font-size 40 --key --bloom-multiplier 0.03 --bloom-intensity 1 --background 012345  -e 0.15 --title '$TITLE'"

ENCODE="$MONGOCLI -o - | ffmpeg -probesize 63M  -y -r 60 -f image2pipe -vcodec ppm -i - -vcodec libx264  -b:v 1000k -preset slow -pix_fmt yuv420p -crf 24 -threads 0 -bf 0 $OUTPUTFILEMP4"
mkdir video
rm $OUTPUTFILEAUDIO
ffmpeg -i $OUTPUTFILEMP4 -i $AUDIOTRACK -c:v copy -c:a aac -strict experimental -filter:a "volume=1.0" -shortest $OUTPUTFILEAUDIO

echo "Render an animation of the AminoSee Github open source code repository evolution of time"
echo title: $TITLE
echo audio: $OUTPUTFILEAUDIO
echo track: $AUDIOTRACK
echo ###############################################
echo THIS IS ACTUAL ENCODE
echo ###############################################
echo $ENCODE
eval $ENCODE
echo "Now Ima go add an audio track up in this..."
echo $OUTPUTFILEMP4
rm $OUTPUTFILEAUDIO
ffmpeg -i $OUTPUTFILEMP4 -i $AUDIOTRACK -c:v copy -c:a aac -strict experimental -filter:a "volume=1.0" -shortest $OUTPUTFILEAUDIO
###############################################
open $OUTPUTFILEAUDIO
rm $OUTPUTFILEMP4
