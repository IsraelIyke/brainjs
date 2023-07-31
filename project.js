const brain = require("brain.js");

// Sample dataset of partially replaced glass concrete (replace with your actual data)
const dataset = [
  {
    input: { glassPercentage: 0, epsPercentage: 0 },
    output: { strength: 25 },
    input: { glassPercentage: 0.7, epsPercentage: 0.1 },
    output: { strength: 5 },
    input: { glassPercentage: 0.2, epsPercentage: 0.1 },
    output: { strength: 25 },
    input: { glassPercentage: 0.2, epsPercentage: 0.1 },
    output: { strength: 25 },
    input: { glassPercentage: 0.2, epsPercentage: 0.1 },
    output: { strength: 25 },
    input: { glassPercentage: 0.7, epsPercentage: 0.1 },
    output: { strength: 5 },
    input: { glassPercentage: 0.2, epsPercentage: 0.1 },
    output: { strength: 25 },
    input: { glassPercentage: 0.2, epsPercentage: 0.1 },
    output: { strength: 25 },
    input: { glassPercentage: 0.2, epsPercentage: 0.1 },
    output: { strength: 25 },
    input: { glassPercentage: 0.7, epsPercentage: 0.1 },
    output: { strength: 5 },
    input: { glassPercentage: 0.7, epsPercentage: 0.1 },
    output: { strength: 5 },
    input: { glassPercentage: 0.7, epsPercentage: 0.1 },
    output: { strength: 5 },
  },
  // Add more data entries here...
];

// Data preprocessing
const normalizedDataset = normalizeDataset(dataset);

// Create a neural network
const net = new brain.NeuralNetwork();

// Train the neural network
net.train(normalizedDataset, {
  log: true, // Set to true for logging training progress
  iterations: 1000, // Number of training iterations
  errorThresh: 0.005, // Acceptable error threshold
});

// Function to normalize the dataset between 0 and 1
function normalizeDataset(dataset) {
  const normalized = dataset.map(({ input, output }) => ({
    input: {
      glassPercentage: input.glassPercentage / 100, // Normalize between 0 and 1
      epsPercentage: input.epsPercentage / 100, // Normalize between 0 and 1
    },
    output: {
      strength: output.strength / 100, // Normalize between 0 and 1
    },
  }));
  return normalized;
}

// Function to denormalize the output value back to its original scale
function denormalizeOutput(output) {
  return output.strength * 100; // Denormalize to the original scale
}

// Function to predict strength for given glassPercentage and epsPercentage
function predictStrength(glassPercentage, epsPercentage) {
  const input = {
    glassPercentage: glassPercentage / 100, // Normalize between 0 and 1
    epsPercentage: epsPercentage / 100, // Normalize between 0 and 1
  };
  const normalizedOutput = net.run(input);
  const strength = denormalizeOutput(normalizedOutput);
  return strength;
}

// Test the trained neural network with new values
const glassPercentageToPredict = 30; // Replace with the percentage you want to predict
const epsPercentageToPredict = 10; // Replace with the percentage you want to predict

const predictedStrength = predictStrength(
  glassPercentageToPredict,
  epsPercentageToPredict
);
console.log(`Predicted Strength: ${predictedStrength.toFixed(2)} MPa`);
