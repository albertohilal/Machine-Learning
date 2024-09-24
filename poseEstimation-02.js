// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  background(255, 255, 0); // Establece un fondo blanco para mayor claridad

  if (pose) {
    // Invertir las posiciones de la mano derecha para que se alinee con el video espejado
    let wristRX = width - pose.rightWrist.x; // Invertir posición de la muñeca derecha

    // Dibuja la muñeca derecha
    fill(0, 0, 255);
    ellipse(wristRX, pose.rightWrist.y, 32); // Mano derecha

    // Controlar el personaje basado en la posición de la muñeca derecha
    controlCharacter(pose.rightWrist);
  }
}

function controlCharacter(rightWrist) {
  // Aquí controlamos el personaje basado en la posición de la muñeca derecha
  if (rightWrist) {
    let wristX = width - rightWrist.x; // Asegurar que la posición X esté invertida

    // Si la mano derecha está a la derecha de la pantalla, mover a la derecha
    if (wristX > width / 2) {
      console.log("Mover hacia la derecha");
    }
    // Si la mano está a la izquierda, mover hacia la izquierda
    else if (wristX < width / 2) {
      console.log("Mover hacia la izquierda");
    }
  }
}
