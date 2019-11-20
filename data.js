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

import * as tf from '@tensorflow/tfjs';

export const CLASSES =
    ['gs_interest_online_shoppers',
     'gs_interest_female',
      'gs_interest_frequent_travelers',
       'gs_home_interiors', 
       'gs_tech', 
       'gs_food', 
       'gs_entertain',
        'gs_home',
         'gs_politics', 
         'gs_tech_computing',
          'gs_sport',
           'gs_food_misc',
            'gs_search',
             'gs_interest_male',
              'gs_science',
               'gs_science_misc',
                'gs_health',
                 'gs_society',
                 'gs_auto',
                  'gs_education'];

export const NUM_CLASSES = 20;


/**
 * Convert data arrays to `tf.Tensor`s.
 *
 * @param data The input feature data, an `Array` of `Array`.
 * @param targets An `Array` of numbers. Assumed to have the same array length as `data`.
 * @param testSplit Fraction of the data at the end to split as test data: a
 *   number between 0 and 1.
 * @return A length-4 `Array`, with
 *   - training data as `tf.Tensor` of shape [numTrainExapmles, 4].
 *   - training one-hot labels as a `tf.Tensor` of shape [numTrainExamples, 3]
 *   - test data as `tf.Tensor` of shape [numTestExamples, 4].
 *   - test one-hot labels as a `tf.Tensor` of shape [numTestExamples, 3]
 */
function convertToTensors(data, targets, testSplit) {
  const numExamples = data.length;
  if (numExamples !== targets.length) {
    throw new Error('data and split have different numbers of examples');
  }
  if (numExamples == 0) {
    console.warn("No examples found!");
    console.warn(data);
    console.warn(targets);
    console.warn(testSplit);
  }

  // Randomly shuffle `data` and `targets`.
  const indices = [];
  for (let i = 0; i < numExamples; ++i) {
    indices.push(i);
  }
  tf.util.shuffle(indices);

  const shuffledData = [];
  const shuffledTargets = [];
  for (let i = 0; i < numExamples; ++i) {
    shuffledData.push(data[indices[i]]);
    shuffledTargets.push(targets[indices[i]]);
  }

  // Split the data into a training set and a tet set, based on `testSplit`.
  const numTestExamples = Math.round(numExamples * testSplit);
  const numTrainExamples = numExamples - numTestExamples;

  const xDims = shuffledData[0].length;

  // Create a 2D `tf.Tensor` to hold the feature data.
  const xs = tf.tensor2d(shuffledData, [numExamples, xDims]);

  // Create a 1D `tf.Tensor` to hold the labels, and convert the number label
  // from the set {0, 1, 2} into one-hot encoding (.e.g., 0 --> [1, 0, 0]).
  const ys = tf.oneHot(tf.tensor1d(shuffledTargets).toInt(), NUM_CLASSES);

  // Split the data into training and test sets, using `slice`.
  const xTrain = xs.slice([0, 0], [numTrainExamples, xDims]);
  const xTest = xs.slice([numTrainExamples, 0], [numTestExamples, xDims]);
  const yTrain = ys.slice([0, 0], [numTrainExamples, NUM_CLASSES]);
  const yTest = ys.slice([0, 0], [numTestExamples, NUM_CLASSES]);
  return [xTrain, yTrain, xTest, yTest];
}

/**
 * Obtains data, split into training and test sets.
 *
 * @param testSplit Fraction of the data at the end to split as test data: a
 *   number between 0 and 1.
 *
 * @param return A length-4 `Array`, with
 *   - training data as an `Array` of length-4 `Array` of numbers.
 *   - training labels as an `Array` of numbers, with the same length as the
 *     return training data above. Each element of the `Array` is from the set
 *     {0, 1, 2}.
 *   - test data as an `Array` of length-4 `Array` of numbers.
 *   - test labels as an `Array` of numbers, with the same length as the
 *     return test data above. Each element of the `Array` is from the set
 *     {0, 1, 2}.
 */
export function getData(testSplit) {
  return tf.tidy(() => {
    const dataByClass = [];
    const targetsByClass = [];
    for (let i = 0; i < CLASSES.length; ++i) {
      dataByClass.push([]);
      targetsByClass.push([]);
    }

    console.info(dataByClass);
    var i = 0;
    for (const example of DATA) {
      //console.info("============================== " + i);
      //console.info(length(dataByClass));
      //console.info(example);
      const target = example[example.length - 1];
      const data = example.slice(0, example.length - 1);
      //console.info(data);
      //console.info("Target: " + target);
      //console.info(dataByClass);
      dataByClass[target].push(data);
      targetsByClass[target].push(target);
      i += 1;
    }

    const xTrains = [];
    const yTrains = [];
    const xTests = [];
    const yTests = [];
    console.info("Starting Tensor Conversion. . .");
    console.info("CLASSES.length: " + CLASSES.length);
    for (let i = 0; i < CLASSES.length; ++i) {
      //console.info("====================== " + i);

      const [xTrain, yTrain, xTest, yTest] =
          convertToTensors(dataByClass[i], targetsByClass[i], testSplit);
      xTrains.push(xTrain);
      yTrains.push(yTrain);
      xTests.push(xTest);
      yTests.push(yTest);
    }

    const concatAxis = 0;
    return [
      tf.concat(xTrains, concatAxis), tf.concat(yTrains, concatAxis),
      tf.concat(xTests, concatAxis), tf.concat(yTests, concatAxis)
    ];
  });
}
