
// Test script to check if model URL is accessible
const MODEL_URL = 'https://huggingface.co/allama-ai/SmolLM-360M-Instruct-onnx-int4/resolve/main/model.onnx';

fetch(MODEL_URL, { method: 'HEAD' })
  .then(response => {
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('OK:', response.ok);
  })
  .catch(error => {
    console.error('Error:', error);
  });
