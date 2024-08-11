const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");
const TRAIN_IMAGES_DIR = "./train";
const TEST_IMAGES_DIR = "./test";
// Classes that I will train
const classes = ["efada", "not_efada"];
//Total number of classes
const n = 2;
function loadImages(dataDir) {
  const images = [];
  const labels = [];

  for (let j = 0; j < n; j++) {
    var dataDir1 = dataDir + `/${classes[j]}`;
    var files = fs.readdirSync(dataDir1);
    for (let i = 0; i < files.length; i++) {
      //   console.log(`Checking ${classes[j]} images..|| image = ${files[i]}`);
      //   if (!files[i].toLocaleLowerCase().endsWith(".jpg")) {
      //     continue;
      //   }
      console.log(`Checking ${classes[j]} images..|| image = ${files[i]}`);
      var filePath = path.join(dataDir1, files[i]);

      var buffer = fs.readFileSync(filePath);
      var imageTensor = tf.node
        .decodeImage(buffer, 3)
        .resizeNearestNeighbor([100, 100])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();
      console.log(imageTensor.shape);
      images.push(imageTensor);
      labels.push(j);
    }
  }
  return [images, labels];
}
// Helper class to handle loading training and test data.
class efada {
  constructor() {
    this.trainData = [];
    this.testData = [];
    this.n = n;
  }
  // Loads training and test data.
  loadData() {
    console.log("Loading images...");
    this.trainData = loadImages(TRAIN_IMAGES_DIR);
    console.log(this.trainData);
    this.testData = loadImages(TEST_IMAGES_DIR);
    console.log("Images loaded successfully.");
  }
  getTrainData() {
    return {
      images: tf.concat(this.trainData[0]),
      labels: tf
        .oneHot(tf.tensor1d(this.trainData[1], "int32"), this.n)
        .toFloat(),
    };
  }
  getTestData() {
    return {
      images: tf.concat(this.testData[0]),
      labels: tf
        .oneHot(tf.tensor1d(this.testData[1], "int32"), this.n)
        .toFloat(),
    };
  }
}
module.exports = new efada();
