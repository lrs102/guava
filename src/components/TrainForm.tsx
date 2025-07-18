import { useState } from 'react';
import ImageUploader from './ImageUploader';
import { createModel, IMAGE_SIZE } from '../models/imageModel';
import * as tf from '@tensorflow/tfjs';

export default function TrainForm() {
    const [model, setModel] = useState(() => createModel());

    const handleTrain = async (files: FileList) => {
        const images: tf.Tensor[] = [];
        const labels: number[] = [];

        for (const file of Array.from(files)) {
            const img = await loadImage(file);
            images.push(img);
            labels.push(file.name.toLowerCase().includes("sheep") ? 1 : 0); // crude label
        }

        const xs = tf.stack(images);
        const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), 2);

        await model.fit(xs, ys, {
            epochs: 10,
            callbacks: { onEpochEnd: (_, logs) => console.log(logs) }
        });

        xs.dispose();
        ys.dispose();
    };

    return (
        <div>
            <h2 className="text-xl font-bold">Train Model</h2>
            <ImageUploader onImagesSelected={handleTrain} />
        </div>
    );
}

async function loadImage(file: File): Promise<tf.Tensor3D> {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = IMAGE_SIZE;
    canvas.height = IMAGE_SIZE;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(bitmap, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
    const imageData = ctx.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE);
    return tf.browser.fromPixels(imageData).div(255.0);
}