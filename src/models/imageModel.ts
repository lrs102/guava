import * as tf from '@tensorflow/tfjs';

export const IMAGE_SIZE = 64;
export const NUM_CLASSES = 2; // sheep / not-sheep

export function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.flatten({ inputShape: [IMAGE_SIZE, IMAGE_SIZE, 3] }));
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dense({ units: NUM_CLASSES, activation: 'softmax' }));

    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}
