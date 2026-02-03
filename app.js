const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  output.value = 'Tu navegador no soporta reconocimiento de voz (prueba en Chrome/Edge en escritorio).';
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = true;        // sigue escuchando hasta que pares [web:29][web:31][web:32]
  recognition.interimResults = true;    // resultados provisionales en tiempo real [web:29][web:31][web:32]

  let finalText = '';
  let isRecognizing = false;

  recognition.onresult = (event) => {
    let interimText = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;

      console.log('Reconocido:', transcript); // para debug en consola [web:21][web:31]

      if (result.isFinal) {
        finalText += transcript + ' ';
      } else {
        interimText += transcript;
      }
    }

    // Mostramos texto final + provisional en el textarea
    output.value = finalText + ' ' + interimText; // [web:22][web:28][web:31]
  };

  recognition.onerror = (event) => {
    console.log('Speech error:', event.error); // mira aquí si hay not-allowed, network, etc. [web:33][web:37][web:41][web:47]
  };

  recognition.onstart = () => {
    console.log('Reconocimiento iniciado');
    isRecognizing = true;
  };

  recognition.onend = () => {
    console.log('Reconocimiento terminado');
    isRecognizing = false;
  };

  startBtn.onclick = () => {
    if (!isRecognizing) {
      try {
        recognition.start(); // lanza error si ya estaba iniciado [web:39][web:45][web:46]
      } catch (e) {
        console.log('Error al iniciar:', e.message);
      }
    }
  };

  stopBtn.onclick = () => {
    if (isRecognizing) {
      recognition.stop();
    }
  };
}
