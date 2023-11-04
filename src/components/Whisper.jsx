import MicRecorder from 'mic-recorder-to-mp3';
import {useState} from "react";
import {MicrophoneIcon, StopIcon} from "@heroicons/react/20/solid";

const Whisper = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [player, setPlayer] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const startRecording = async () => {
    const newRecorder = new MicRecorder({bitRate: 128});

    try {
      await newRecorder.start();
      setIsRecording(true);
      setRecorder(newRecorder);
    } catch (e) {
      console.error(e);
      alert(e)
    }
  };

  const stopRecording = async () => {
    if (!recorder) return;

    try {
      const [buffer, blob] = await recorder.stop().getMp3();
      const audioFile = new File(buffer, "voice-message.mp3", {
        type: blob.type,
        lastModified: Date.now(),
      });
      setPlayer(new Audio(URL.createObjectURL(audioFile)));
      setIsRecording(false);
      setAudioFile(audioFile); // Add this line
    } catch (e) {
      console.error(e);
      alert(e)
    }
  };

  const playRecording = () => {
    if (player) {
      player.play();
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-full">
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <div
              color="primary"
              aria-label="start recording"
              onClick={startRecording}
              disabled={isRecording}
            >
              <MicrophoneIcon width={100}
                              height={100}
                              className="text-green-700 hover:text-green-700 font-bold py-2 px-4 rounded"/>
            </div>
          </div>
          <div className="col-span-1">
            <div
              aria-label="stop recording"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              <StopIcon width={100}
                        height={100}
                        className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded"/>
            </div>
          </div>
          <div className="col-span-1">
            <div
              variant="contained"
              disableElevation
              onClick={playRecording}
              disabled={isRecording}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Play
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Whisper