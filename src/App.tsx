import { useState } from 'react';
import TrainForm from './components/TrainForm';
import TestForm from './components/TestForm';
import { createModel } from './models/imageModel';

function App() {
    const [model] = useState(() => createModel());

    return (
        <div className="max-w-xl mx-auto p-4 space-y-8">
            <h1 className="text-2xl font-bold text-center">TensorFlow Image Trainer</h1>
            <TrainForm />
            <TestForm model={model} />
        </div>
    );
}

export default App;
