# Recognise eFada Sign
This project is to recognise the picture of eFada stamp using Image-Classifier\
In our project i tried to use least resources and efficient result!\
I acheived that by using the package `@tensorflow/tfjs-node` \
Follow the Instruction to successfuly use the project!
## Pre-requsite:-
- NodeJs v18+
If Not installed please refer to the official installation guide:-\
- Visit to download both [Node + NPM](https://nodejs.org/en/download/package-manager)
##Package installation
install all the packages required by running the following command on cmd
```
npm install
```
IMPORTANT :-\
After Downloading the packages run
```
cp .\node_modules\@tensorflow\tfjs-node\lib\napi-v9\tensorflow.dll .\node_modules\@tensorflow\tfjs-node\lib\napi-v8\tensorflow.dll
```
Make sure you are in the directory of the project where `node_modules` exist!
## Run
Add pictures in `test` to test the functionallity of the project. Then RUN:-
```
node ./predict.js
```
the result will be wether it's eFada or Not
