const startBtn = document.getElementById('start');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  output.textContent = 'Tu navegador no soporta reconocimiento de voz.';
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let text = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }
    output.textContent = text;
  };

  recognition.onerror = (e) => {
    console.error(e);
  };

  startBtn.onclick = () => {
    recognition.start();
  };
}
