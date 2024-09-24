/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates drawing skeletons on poses for the MoveNet model.
 */

let video;
let bodyPose;
let poses = [];
let connections;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it (but we won't display it in the draw function)
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // The video is still captured, but it won't be drawn
  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);

  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  background(255, 255, 0); // Set a white background for better contrast

  // Dibujar conexiones del esqueleto
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    // Dibuja el esqueleto
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0); // Red skeleton lines
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }

    // Dibuja una elipse en la cabeza (usando nariz y ojos como referencia)
    let nose = pose.keypoints[0]; // Índice 0 es la nariz
    let leftEye = pose.keypoints[1]; // Índice 1 es el ojo izquierdo
    let rightEye = pose.keypoints[2]; // Índice 2 es el ojo derecho

    if (
      nose.confidence > 0.1 &&
      leftEye.confidence > 0.1 &&
      rightEye.confidence > 0.1
    ) {
      let headWidth = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y) * 1.5; // El ancho de la elipse está basado en la distancia entre los ojos
      let headHeight = headWidth * 1.5; // Altura de la elipse proporcional al ancho
      fill(255, 255, 255, 100); // Color azul con transparencia
      noStroke();
      ellipse(nose.x, nose.y - headHeight / 4, headWidth, headHeight); // Dibujar la elipse en la cabeza
    }

    // Dibujar todos los puntos clave
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0); // Green keypoint circles
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
