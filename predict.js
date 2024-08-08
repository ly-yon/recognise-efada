const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
async function main(name) {
  try {
    model = await tf.loadLayersModel("file://model/model.json");
    if (!/\./i.test(name)) return;
    const image = fs.readFileSync(`Test/${name}`);
    const classes = ["efada", "not_efada"];
    TARGET_CLASSES = Object.assign({}, classes);
    // Pre-process the image
    let tensor = tf.node
      .decodeImage(image, 3)
      .resizeNearestNeighbor([100, 100])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();
    let predictions = await model.predict(tensor).data();
    let top5 = Array.from(predictions)
      .map(function (p, i) {
        return {
          probability: p,
          className: TARGET_CLASSES[i], // we are selecting the value from the obj
        };
      })
      .sort((a, b) => b.probability - a.probability);
    console.log(top5);
    console.log(
      "After Concluding the Result:-\nPicture " +
        name +
        " is: " +
        top5[0].className
    );
  } catch (e) {
    console.log(e);
  }
}
async function read(path) {
  let files = fs.readdirSync(path).map((fileName) => {
    console.log(fileName);

    return fileName;
  });
  for (i in files) await main(files[i]);
}
read("Test");
