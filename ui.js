/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {CLASSES, NUM_CLASSES} from './data';

/**
 * Clear the evaluation table.
 */
export function clearEvaluateTable() {
  const tableBody = document.getElementById('evaluate-tbody');
  while (tableBody.children.length > 1) {
    tableBody.removeChild(tableBody.children[1]);
  }
}

/**
 * Get manually input data from the input boxes.
 */
export function getManualInputData() {
  return [
    String(document.getElementById('title').value),
    String(document.getElementById('body').value),
  ];
}


export function setManualInputWinnerMessage(message) {
  const winnerElement = document.getElementById('winner');
  winnerElement.textContent = message;
}

function logitsToSpans(logits) {
  let idxMax = -1;
  let maxLogit = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < logits.length; ++i) {
    if (logits[i] > maxLogit) {
      maxLogit = logits[i];
      idxMax = i;
    }
  }
  const spans = [];
  for (let i = 0; i < logits.length; ++i) {
    const logitSpan = document.createElement('span');
    logitSpan.textContent = logits[i].toFixed(3);
    if (i === idxMax) {
      logitSpan.style['font-weight'] = 'bold';
    }
    logitSpan.classList = ['logit-span'];
    spans.push(logitSpan);
  }
  return spans;
}

function renderLogits(logits, parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  logitsToSpans(logits).map(logitSpan => {
    parentElement.appendChild(logitSpan);
  });
}

export function renderLogitsForManualInput(logits) {
  const logitsElement = document.getElementById('logits');
  renderLogits(logits, logitsElement);
}

export function renderEvaluateTable(xData, yTrue, yPred, logits) {
  const tableBody = document.getElementById('evaluate-tbody');

  for (let i = 0; i < yTrue.length; ++i) {
    const row = document.createElement('tr');
    for (let j = 0; j < 4; ++j) {
      const cell = document.createElement('td');
      cell.textContent = xData[4 * i + j].toFixed(1);
      row.appendChild(cell);
    }
    const truthCell = document.createElement('td');
    truthCell.textContent = CLASSES[yTrue[i]];
    row.appendChild(truthCell);
    const predCell = document.createElement('td');
    predCell.textContent = CLASSES[yPred[i]];
    predCell.classList =
        yPred[i] === yTrue[i] ? ['correct-prediction'] : ['wrong-prediction'];
    row.appendChild(predCell);
    const logitsCell = document.createElement('td');
    const exampleLogits =
        logits.slice(i * NUM_CLASSES, (i + 1) * NUM_CLASSES);
    logitsToSpans(exampleLogits).map(logitSpan => {
      logitsCell.appendChild(logitSpan);
    });
    row.appendChild(logitsCell);
    tableBody.appendChild(row);
  }
}

export function wireUpEvaluateTableCallbacks(predictOnManualInputCallback) {
  const title = document.getElementById('title');
  const body = document.getElementById('body');

  document.getElementById('title').addEventListener('change', () => {
    predictOnManualInputCallback();
  });
  document.getElementById('body').addEventListener('change', () => {
    predictOnManualInputCallback();
  });
}

export function loadTrainParametersFromUI() {
  return {
    vocabSize: Number(document.getElementById('vocab-size').value),
    embeddingDim: Number(document.getElementById('embedding-dim').value)
  };
}

export function status(statusText) {
  console.log(statusText);
  document.getElementById('demo-status').textContent = statusText;
}
