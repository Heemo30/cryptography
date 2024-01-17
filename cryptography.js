function processMessage(action) {
    const message = document.getElementById('message').value;
    const encryptionType = document.getElementById('encryptionType').value;
    const keyInput = document.getElementById('keyInput');
    let key = null;
  
    if (encryptionType === 'vigenere') {
      key = document.getElementById('key').value;
      if (!key) {
        alert("Key is required for Vigenère cipher.");
        return;
      }
    }
  
    let result;
  
    if (action === 'encrypt') {
      result = encrypt(message, encryptionType, key);
      document.getElementById('encryptedOutput').innerText = result;
      document.getElementById('encryptedMessage').style.display = 'block';
      document.getElementById('decryptedMessage').style.display = 'none';
    } else if (action === 'decrypt') {
      result = decrypt(message, encryptionType, key);
      document.getElementById('decryptedOutput').innerText = result;
      document.getElementById('encryptedMessage').style.display = 'none';
      document.getElementById('decryptedMessage').style.display = 'block';
    }
  }
  
  function encrypt(message, encryptionType, key) {
    if (encryptionType === 'caesar') {
      const shift = 3; // You can change this value for a different shift
      return caesarCipher(message, shift);
    } else if (encryptionType === 'vigenere') {
      return vigenereCipher(message, key);
    }
  }
  
  function decrypt(message, encryptionType, key) {
    if (encryptionType === 'caesar') {
      const shift = 3; // You should use the same shift used for encryption
      return caesarCipher(message, -shift);
    } else if (encryptionType === 'vigenere') {
      return vigenereCipher(message, key, true);
    }
  }
  
  function caesarCipher(str, shift) {
    return str.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        let shiftAmount = shift % 26;
        const shiftedCode = code + shiftAmount;
        let base = 'A';
        if (char.match(/[a-z]/)) {
          base = 'a';
        }
        return String.fromCharCode(((shiftedCode - base.charCodeAt(0) + 26) % 26) + base.charCodeAt(0));
      }
      return char;
    }).join('');
  }
  
  function vigenereCipher(str, key, decrypt = false) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = char.match(/[a-z]/) ? 'a' : 'A';
        const keyChar = key.charCodeAt(i % key.length) - base.charCodeAt(0);
        const shiftAmount = decrypt ? -keyChar : keyChar;
        const shiftedCode = code + shiftAmount;
        result += String.fromCharCode(((shiftedCode - base.charCodeAt(0) + 26) % 26) + base.charCodeAt(0));
      } else {
        result += char;
      }
    }
    return result;
  }
  
  function generateRandomKey() {
    const keyInput = document.getElementById('key');
    const message = document.getElementById('message').value;
    const randomKey = Array.from({ length: message.length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
    keyInput.value = randomKey;
  }
  
  function clearAllFields() {
    document.getElementById('message').value = '';
    document.getElementById('encryptionType').value = 'caesar';
    document.getElementById('key').value = '';
    document.getElementById('encryptedOutput').innerText = '';
    document.getElementById('decryptedOutput').innerText = '';
    document.getElementById('encryptedMessage').style.display = 'none';
    document.getElementById('decryptedMessage').style.display = 'none';
  }
  
  document.getElementById('encryptionType').addEventListener('change', function() {
    const keyInput = document.getElementById('keyInput');
    if (this.value === 'vigenere') {
      keyInput.style.display = 'block';
    } else {
      keyInput.style.display = 'none';
    }
  });
  