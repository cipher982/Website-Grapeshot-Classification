/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ==============================================================================
 */

// This tiny example illustrates how little code is necessary build /
// train / predict from a model in TensorFlow.js.  Edit this code
// and refresh the index.html to quickly explore the API.

// Tiny TFJS train / predict example.
async function run() {

  // Create a simple model.
  //const model = tf.sequential();
  //const model = await tf.loadLayersModel('localstorage://saved_model_20191008_valLoss-1.394');
  
  //const model = await tf.loadLayersModel("https://drive.google.com/open?id=1MXEx-dMg04x3wzynRnWINc6FnHtqTyjt")
  const model = await tf.loadLayersModel(C:\Users\david\Documents\github\sample-tfjs\model.json)
  
  document.getElementById('micro-out-div').innerText = 'test';
}
  run();
