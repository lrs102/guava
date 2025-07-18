import ImageUploader from './ImageUploader';
import { IMAGE_SIZE } from '../models/imageModel';
import * as tf from '@tensorflow/tfjs';

type Props = {
    model: tf.LayersModel;
};

export default function TestForm({ model }: Props) {
    const handleTest = async (files: FileList) => {
        const file = files[0];
        const img = await loadImage(file);
        const prediction = model.predict(tf.expandDims(img)) as tf.Tensor;
        const result = prediction.argMax(-1);
        const index = (await result.data())[0];
        alert(index === 1 ? "Sheep detected 🐑" : "Not a sheep ❌");
        img.dispose();
        result.dispose();
        prediction.dispose();
    };

    return (
        <div>
            <h2 className="text-xl font-bold">Test Model</h2>
            <ImageUploader onImagesSelected={handleTest} acceptMultiple={false} />
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
