// Tiny TFJS train / predict example.
async function run() {

  // Create a simple model.
  //const model = tf.sequential();
  //const model = await tf.loadLayersModel('localstorage://saved_model_20191008_valLoss-1.394');
  
  //const model = await tf.loadLayersModel("https://drive.google.com/open?id=1MXEx-dMg04x3wzynRnWINc6FnHtqTyjt")
  const model = await tf.loadLayersModel("assets/model.json")
  
  document.getElementById('micro-out-div').innerText = 'test';
}
  run();
