const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  output.value = 'Tu navegador no soporta reconocimiento de voz (prueba en Chrome).';
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = true;        // escucha continuo [web:29][web:31][web:32]
  recognition.interimResults = true;    // resultados “en vivo” mientras hablas [web:29][web:31][web:32]

  let finalText = '';

  recognition.onresult = (event) => {
    let interimText = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalText += transcript + ' ';
      } else {
        interimText += transcript;
      }
    }

    // finalText = lo confirmado, interimText = lo que está “en proceso”
    output.value = finalText + ' ' + interimText;  // lo mostramos en el textarea [web:22][web:28][web:31]
  };

  recognition.onerror = (e) => {
    console.error(e);
  };

  startBtn.onclick = () => {
    recognition.start();
  };

  stopBtn.onclick = () => {
    recognition.stop();
  };
}
