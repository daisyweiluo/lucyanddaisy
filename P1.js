// UBC CPSC 314 (2015W2) -- P1
// HAVE FUN!!! :)

// ASSIGNMENT-SPECIFIC API EXTENSION
THREE.Object3D.prototype.setMatrix = function(a) {
  this.matrix=a;
  this.matrix.decompose(this.position,this.quaternion,this.scale);
}

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xC7F49F); // white background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,40);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// SETUP HELPER GRID
// Note: Press Z to show/hide
var gridGeometry = new THREE.Geometry();
var i;
for(i=-50;i<51;i+=2) {
    gridGeometry.vertices.push( new THREE.Vector3(i,0,-50));
    gridGeometry.vertices.push( new THREE.Vector3(i,0,50));
    gridGeometry.vertices.push( new THREE.Vector3(-50,0,i));
    gridGeometry.vertices.push( new THREE.Vector3(50,0,i));
}

var gridMaterial = new THREE.LineBasicMaterial({color:0xBBBBBB});
var grid = new THREE.Line(gridGeometry,gridMaterial,THREE.LinePieces);

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// MATERIALS
// Note: Feel free to be creative with this! 
var normalMaterial = new THREE.MeshNormalMaterial();

// function drawCube()
// Draws a unit cube centered about the origin.
// Note: You will be using this for all of your geometry
function makeCube() {
  var unitCube = new THREE.BoxGeometry(1,1,1);
  return unitCube;
}

// GEOMETRY
var torsoGeometry = makeCube();

var non_uniform_scale = new THREE.Matrix4().set(5,0,0,0, 0,5,0,0, 0,0,5,0, 0,0,0,1);

torsoGeometry.applyMatrix(non_uniform_scale);

// TO-DO: SPECIFY THE REST OF YOUR STAR-NOSE MOLE'S GEOMETRY. 
// Note: You will be using transformation matrices to set the shape. 
// Note: You are not allowed to use the tools Three.js provides for 
//       rotation, translation and scaling.
// Note: The torso has been done for you (but feel free to modify it!)  
// Hint: Explicity declare new matrices using Matrix4().set     

//tran first, rotation, last scale

// MATRICES

// var ANGLE = 45.0;
// var dg = Math.PI * ANGLE / 180.0; 

// ALL THE MAIN JOINT MATRIX : Change the matrix below will revoke animations!!!
//************************
var torsoMatrix = getscaleMatrix(1,1,1);  // b

var backLlegMatrix = gettransMatrix(3.2,-1.5,1); 
var backRlegMatrix = gettransMatrix(-3.2,-1.5,1);

var backLpalmMatrix = gettransMatrix(-0.2,-3,1);
var backRpalmMatrix = gettransMatrix(0.2,-3,1);

var frontLlegMatrix = gettransMatrix(3.5,-2,10); 
var frontRlegMatrix = gettransMatrix(-3.5,-2,10);

var frontLpalmMatrix = gettransMatrix(0,-2.5,0.5);
var frontRpalmMatrix = gettransMatrix(0,-2.5,0.5);

var headtransMatrix = gettransMatrix(0,0,16);

var toeMatrix = getscaleMatrix(0.1,0.1,0.1);
//************************

//getscalMatrix


// var transMatrix = gettransMatrix(0,0,9);
// var rotMatrix = getRotMatrix(dg,"x");
// var transtorsoMatrix = multiplyHelper(torsoMatrix, transMatrix);
// var RotatedtorsoMatrix = multiplyHelper(transtorsoMatrix, rotMatrix);
//var transRotatedtorsoMatrix = multiplyHelper(RotatedtorsoMatrix, transMatrix);



// TORSO TESTING
var torsotrans = multiplyHelper(torsoMatrix, gettransMatrix(0,0,-2.3));

//HEADS
var headMatrix = multiplyHelper(torsoMatrix, headtransMatrix);
var headscal = getscaleMatrix(0.7,0.7,0.7);
var head_Matrix = multiplyHelper(headMatrix, headscal);

//LEGS THIGHS
//******* BACK MAIN LEG MATRIX **********
var LlegtransMatrix = multiplyHelper(torsoMatrix, backLlegMatrix);
var RlegtransMatrix = multiplyHelper(torsoMatrix, backRlegMatrix);
//*********************************

var legscalMatrix = getscaleMatrix(0.3,0.5,0.5);

var LlegMatrix = multiplyHelper(LlegtransMatrix,legscalMatrix);
var RlegMatrix = multiplyHelper(RlegtransMatrix,legscalMatrix);

//SMALL LEGS( children of LEGS THIGHS)
var LsmllegtransMatrix = multiplyHelper(LlegtransMatrix, gettransMatrix(-0.2,-1.5,0));
var RsmllegtransMatrix = multiplyHelper(RlegtransMatrix, gettransMatrix(0.2,-1.5,0));
var smllegscalMatrix = getscaleMatrix(0.2,0.3,0.3);

var LsmllegMatrix = multiplyHelper(LsmllegtransMatrix,smllegscalMatrix);
var RsmllegMatrix = multiplyHelper(RsmllegtransMatrix,smllegscalMatrix);

//LOWER SMALL LEGS (children of LEGS THIGHS)
 var LlowerlegtransMatrix = multiplyHelper(LlegtransMatrix, gettransMatrix(-0.2,-2.2,0));
 var RlowerlegtransMatrix = multiplyHelper(RlegtransMatrix, gettransMatrix(0.2,-2.2,0));
 var lowerlegscalMatrix = getscaleMatrix(0.1,0.35,0.1);

 var LlowerlegMatrix = multiplyHelper(LlowerlegtransMatrix,lowerlegscalMatrix);
 var RlowerlegMatrix = multiplyHelper(RlowerlegtransMatrix,lowerlegscalMatrix);


 //BACK PALM (children of LEGS THIGHS)
 // ****** MAIN BACK PALM MATRIX *****
var LpalmtransMtx = multiplyHelper(LlegtransMatrix, backLpalmMatrix);
var RpalmtransMtx = multiplyHelper(RlegtransMatrix, backRpalmMatrix);
//*********************************

var palmscalMtx = getscaleMatrix(0.2,0.1,0.5);
var LpalmMtx = multiplyHelper(LpalmtransMtx,palmscalMtx);
var RpalmMtx = multiplyHelper(RpalmtransMtx,palmscalMtx);

 //FIVE BACK  LEFT TOES(children of LEFT PALM)
 var backToe1trans = multiplyHelper(LpalmtransMtx, gettransMatrix(0.4,-0.1,1.5));
 var backToe2trans = multiplyHelper(LpalmtransMtx, gettransMatrix(0.2,-0.1,1.5));
 var backToe3trans = multiplyHelper(LpalmtransMtx, gettransMatrix(0,-0.1,1.5));
 var backToe4trans = multiplyHelper(LpalmtransMtx, gettransMatrix(-0.2,-0.1,1.5));
 var backToe5trans = multiplyHelper(LpalmtransMtx, gettransMatrix(-0.4,-0.1,1.5));
 var backToescal = getscaleMatrix(0.03,0.03,0.2);

 var backToe1Matrix = multiplyHelper(backToe1trans, backToescal);
 var backToe2Matrix = multiplyHelper(backToe2trans, backToescal);
 var backToe3Matrix = multiplyHelper(backToe3trans, backToescal);
 var backToe4Matrix = multiplyHelper(backToe4trans, backToescal);
 var backToe5Matrix = multiplyHelper(backToe5trans, backToescal);

 //FIVE BACK RIGHT TOES(children of RIGHT PALM)
 var backToe6trans = multiplyHelper(RpalmtransMtx, gettransMatrix(-0.4,-0.1,1.5));
 var backToe7trans = multiplyHelper(RpalmtransMtx, gettransMatrix(-0.2,-0.1,1.5));
 var backToe8trans = multiplyHelper(RpalmtransMtx, gettransMatrix(0,-0.1,1.5));
 var backToe9trans = multiplyHelper(RpalmtransMtx, gettransMatrix(0.2,-0.1,1.5));
 var backToe10trans = multiplyHelper(RpalmtransMtx, gettransMatrix(0.4,-0.1,1.5));

 var backToe6Matrix = multiplyHelper(backToe6trans, backToescal);
 var backToe7Matrix = multiplyHelper(backToe7trans, backToescal);
  var backToe8Matrix = multiplyHelper(backToe8trans, backToescal);
 var backToe9Matrix = multiplyHelper(backToe9trans, backToescal);
 var backToe10Matrix = multiplyHelper(backToe10trans, backToescal);



//FRONT THIGHS
// ******** FRONT MAIN LEG MATRIX ***********
var frontLtransMatrix = multiplyHelper(torsoMatrix, frontLlegMatrix);
var frontRtransMatrix = multiplyHelper(torsoMatrix, frontRlegMatrix);
//*********************************************
var frontscalMatrix = getscaleMatrix(0.3,0.5,0.5);

var frontLMatrix = multiplyHelper(frontLtransMatrix,frontscalMatrix);
var frontRMatrix = multiplyHelper(frontRtransMatrix,frontscalMatrix);

//FRONT KNEE(children of FRONT THIGHS)
var frontLLtransMatrix = multiplyHelper(frontLtransMatrix, gettransMatrix(0,-1,0));
var frontRLtransMatrix = multiplyHelper(frontRtransMatrix, gettransMatrix(0,-1,0));
var frontLscalMatrix = getscaleMatrix(0.2,0.6,0.2);

var frontLLMatrix = multiplyHelper(frontLLtransMatrix,frontLscalMatrix);
var frontRLMatrix = multiplyHelper(frontRLtransMatrix,frontLscalMatrix);

//FRONT PALM(children of FRONT THIGHS)
//***** FRONT PALM MATRIZ *********
var frontLpalmtransMtx = multiplyHelper(frontLtransMatrix, frontLpalmMatrix);
var frontRpalmtransMtx = multiplyHelper(frontRtransMatrix, frontRpalmMatrix);
//*********************************
var frontpalmscalMtx = getscaleMatrix(0.4,0.1,0.5);
var frontLpalmMtx = multiplyHelper(frontLpalmtransMtx,frontpalmscalMtx);
var frontRpalmMtx = multiplyHelper(frontRpalmtransMtx,frontpalmscalMtx);


 //FIVE FRONT LEFT TOES(children of PALM)
 var frontToe1trans = multiplyHelper(frontLpalmtransMtx, gettransMatrix(0.8,0,1.5));
 var frontToe2trans = multiplyHelper(frontLpalmtransMtx, gettransMatrix(0.4,0,1.5));
 var frontToe3trans = multiplyHelper(frontLpalmtransMtx, gettransMatrix(0,0,1.5));
 var frontToe4trans = multiplyHelper(frontLpalmtransMtx, gettransMatrix(-0.4,0,1.5));
 var frontToe5trans = multiplyHelper(frontLpalmtransMtx, gettransMatrix(-0.8,0,1.5));
 var frontToescal = getscaleMatrix(0.07,0.03,0.4);


// torsoMatrix.multiply(getscaleMatrix(2,2,2)); 
 var frontToe1Matrix = multiplyHelper(frontToe1trans, frontToescal);
 var frontToe2Matrix = multiplyHelper(frontToe2trans, frontToescal);
 var frontToe3Matrix = multiplyHelper(frontToe3trans, frontToescal);
 var frontToe4Matrix = multiplyHelper(frontToe4trans, frontToescal);
 var frontToe5Matrix = multiplyHelper(frontToe5trans, frontToescal);


 //FIVE FRONT RIGHT TOES
 var frontToe6trans = multiplyHelper(frontRpalmtransMtx, gettransMatrix(-0.8,0,1.5));
 var frontToe7trans = multiplyHelper(frontRpalmtransMtx, gettransMatrix(-0.4,0,1.5));
 var frontToe8trans = multiplyHelper(frontRpalmtransMtx, gettransMatrix(0,0,1.5));
 var frontToe9trans = multiplyHelper(frontRpalmtransMtx, gettransMatrix(0.4,0,1.5));
 var frontToe10trans = multiplyHelper(frontRpalmtransMtx, gettransMatrix(0.8,0,1.5));

 var frontToe6Matrix = multiplyHelper(frontToe6trans, frontToescal);
 var frontToe7Matrix = multiplyHelper(frontToe7trans, frontToescal);
  var frontToe8Matrix = multiplyHelper(frontToe8trans, frontToescal);
 var frontToe9Matrix = multiplyHelper(frontToe9trans, frontToescal);
 var frontToe10Matrix = multiplyHelper(frontToe10trans, frontToescal);


//NOSE
var nosetransMatrix = gettransMatrix(0,0,2);
var nosescalMatrix =  getscaleMatrix(0.4,0.5,0.4);
var nosematrix = multiplyHelper(headMatrix, nosetransMatrix);
var noseMatrix=multiplyHelper(nosematrix,nosescalMatrix);

//SMALL NOSE TENTACLES
var noseSmallscalMatrix = getscaleMatrix(0.05,0.2,0.05);
var noseSmallURtransMatrix = multiplyHelper(nosematrix,gettransMatrix(0,1.5,0.75));
var noseSmallULtransMatrix = multiplyHelper(nosematrix,gettransMatrix(-0.5,1.5,0.75));
var noseSmallDRtransMatrix = multiplyHelper(nosematrix,gettransMatrix(0,-1.5,0.75));
var noseSmallDLtransMatrix = multiplyHelper(nosematrix,gettransMatrix(-0.5,-1.5,0.75));
var noseSmallURMatrix=multiplyHelper(noseSmallURtransMatrix,noseSmallscalMatrix);
var noseSmallULMatrix=multiplyHelper(noseSmallULtransMatrix,noseSmallscalMatrix);
var noseSmallDRMatrix=multiplyHelper(noseSmallDRtransMatrix,noseSmallscalMatrix);
var noseSmallDLMatrix=multiplyHelper(noseSmallDLtransMatrix,noseSmallscalMatrix);

// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
// Hint: Play around with the headTorsoMatrix values, what changes in the render? Why?         


// CREATE BODY
var torso = new THREE.Mesh(torsoGeometry,normalMaterial);

//HEAD
var head = new THREE.Mesh(torsoGeometry,normalMaterial);
//LEGS
var Lleg = new THREE.Mesh(torsoGeometry,normalMaterial);
var Rleg = new THREE.Mesh(torsoGeometry,normalMaterial);

//SMALL LEGS
var Lsmlleg = new THREE.Mesh(torsoGeometry,normalMaterial);
var Rsmlleg = new THREE.Mesh(torsoGeometry,normalMaterial);

//LOWER LEGS
var Llowerleg = new THREE.Mesh(torsoGeometry,normalMaterial);
var Rlowerleg = new THREE.Mesh(torsoGeometry,normalMaterial);

 //PALM
var Lpalm = new THREE.Mesh(torsoGeometry,normalMaterial);
var Rpalm = new THREE.Mesh(torsoGeometry,normalMaterial);

//FRONT THIGH
var frontLleg = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontRleg = new THREE.Mesh(torsoGeometry,normalMaterial);

//FRONT KNEE
var frontLLleg = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontRLleg = new THREE.Mesh(torsoGeometry,normalMaterial);


 //PALM
var frontLpalm = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontRpalm = new THREE.Mesh(torsoGeometry,normalMaterial);

//Nose
var nose=new THREE.Mesh(torsoGeometry,normalMaterial);

// Nose Tentacles SMALL
var noseSmallUR=new THREE.Mesh(torsoGeometry,normalMaterial);
var noseSmallUL=new THREE.Mesh(torsoGeometry,normalMaterial);
var noseSmallDR=new THREE.Mesh(torsoGeometry,normalMaterial);
var noseSmallDL=new THREE.Mesh(torsoGeometry,normalMaterial);

//BACK TOES
var backToe1 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe2 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe3 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe4 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe5 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe6 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe7 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe8 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe9 = new THREE.Mesh(torsoGeometry,normalMaterial);
var backToe10 = new THREE.Mesh(torsoGeometry,normalMaterial);

//BACK TOES
var frontToe1 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe2 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe3 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe4 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe5 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe6 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe7 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe8 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe9 = new THREE.Mesh(torsoGeometry,normalMaterial);
var frontToe10 = new THREE.Mesh(torsoGeometry,normalMaterial);



head.setMatrix(head_Matrix);
torso.setMatrix(torsotrans);
Lleg.setMatrix(LlegMatrix);
Rleg.setMatrix(RlegMatrix);
Lsmlleg.setMatrix(LsmllegMatrix);
Rsmlleg.setMatrix(RsmllegMatrix);
Llowerleg.setMatrix(LlowerlegMatrix);
Rlowerleg.setMatrix(RlowerlegMatrix);
Lpalm.setMatrix(LpalmMtx);
Rpalm.setMatrix(RpalmMtx);

frontLleg.setMatrix(frontLMatrix);
frontRleg.setMatrix(frontRMatrix);

frontLLleg.setMatrix(frontLLMatrix);
frontRLleg.setMatrix(frontRLMatrix);

frontLpalm.setMatrix(frontLpalmMtx);
frontRpalm.setMatrix(frontRpalmMtx);

backToe1.setMatrix(backToe1Matrix);
backToe2.setMatrix(backToe2Matrix);
backToe3.setMatrix(backToe3Matrix);
backToe4.setMatrix(backToe4Matrix);
backToe5.setMatrix(backToe5Matrix);
backToe6.setMatrix(backToe6Matrix);
backToe7.setMatrix(backToe7Matrix);
backToe8.setMatrix(backToe8Matrix);
backToe9.setMatrix(backToe9Matrix);
backToe10.setMatrix(backToe10Matrix);

frontToe1.setMatrix(frontToe1Matrix);
frontToe2.setMatrix(frontToe2Matrix);
frontToe3.setMatrix(frontToe3Matrix);
frontToe4.setMatrix(frontToe4Matrix);
frontToe5.setMatrix(frontToe5Matrix);
frontToe6.setMatrix(frontToe6Matrix);
frontToe7.setMatrix(frontToe7Matrix);
frontToe8.setMatrix(frontToe8Matrix);
frontToe9.setMatrix(frontToe9Matrix);
frontToe10.setMatrix(frontToe10Matrix);


nose.setMatrix(noseMatrix);
noseSmallUR.setMatrix(noseSmallURMatrix);
noseSmallUL.setMatrix(noseSmallULMatrix);
noseSmallDR.setMatrix(noseSmallDRMatrix);
noseSmallDL.setMatrix(noseSmallDLMatrix);

//scene.add(torso);
scene.add(head);
scene.add(Lleg);
scene.add(Rleg);
scene.add(Lsmlleg);
scene.add(Rsmlleg);
scene.add(Llowerleg);
scene.add(Rlowerleg);
scene.add(Lpalm);
scene.add(Rpalm);

scene.add(frontLleg);
scene.add(frontRleg);

scene.add(frontLLleg);
scene.add(frontRLleg);

scene.add(frontLpalm);
scene.add(frontRpalm);


scene.add(nose);
scene.add(noseSmallUR);
scene.add(noseSmallUL);
scene.add(noseSmallDR);
scene.add(noseSmallDL);

scene.add(backToe1);
scene.add(backToe2);
scene.add(backToe3);
scene.add(backToe4);
scene.add(backToe5);
scene.add(backToe6);
scene.add(backToe7);
scene.add(backToe8);
scene.add(backToe9);
scene.add(backToe10);

scene.add(frontToe1);
scene.add(frontToe2);
scene.add(frontToe3);
scene.add(frontToe4);
scene.add(frontToe5);
scene.add(frontToe6);
scene.add(frontToe7);
scene.add(frontToe8);
scene.add(frontToe9);
scene.add(frontToe10);


function resetFcn(){
  head.setMatrix(head_Matrix);
  torso.setMatrix(torsotrans);
  Lleg.setMatrix(LlegMatrix);
  Rleg.setMatrix(RlegMatrix);
  Lsmlleg.setMatrix(LsmllegMatrix);
  Rsmlleg.setMatrix(RsmllegMatrix);
  Llowerleg.setMatrix(LlowerlegMatrix);
  Rlowerleg.setMatrix(RlowerlegMatrix);
  Lpalm.setMatrix(LpalmMtx);
  Rpalm.setMatrix(RpalmMtx);

  frontLleg.setMatrix(frontLMatrix);
  frontRleg.setMatrix(frontRMatrix);

  frontLLleg.setMatrix(frontLLMatrix);
  frontRLleg.setMatrix(frontRLMatrix);

  frontLpalm.setMatrix(frontLpalmMtx);
  frontRpalm.setMatrix(frontRpalmMtx);

  backToe1.setMatrix(backToe1Matrix);
  backToe2.setMatrix(backToe2Matrix);
  backToe3.setMatrix(backToe3Matrix);
  backToe4.setMatrix(backToe4Matrix);
  backToe5.setMatrix(backToe5Matrix);
  backToe6.setMatrix(backToe6Matrix);
  backToe7.setMatrix(backToe7Matrix);
  backToe8.setMatrix(backToe8Matrix);
  backToe9.setMatrix(backToe9Matrix);
  backToe10.setMatrix(backToe10Matrix);

  frontToe1.setMatrix(frontToe1Matrix);
  frontToe2.setMatrix(frontToe2Matrix);
  frontToe3.setMatrix(frontToe3Matrix); 
  frontToe4.setMatrix(frontToe4Matrix);
  frontToe5.setMatrix(frontToe5Matrix);
  frontToe6.setMatrix(frontToe6Matrix);
  frontToe7.setMatrix(frontToe7Matrix);
  frontToe8.setMatrix(frontToe8Matrix);
  frontToe9.setMatrix(frontToe9Matrix);
  frontToe10.setMatrix(frontToe10Matrix);


  nose.setMatrix(noseMatrix);
  noseSmallUR.setMatrix(noseSmallURMatrix);
  noseSmallUL.setMatrix(noseSmallULMatrix);
  noseSmallDR.setMatrix(noseSmallDRMatrix);
  noseSmallDL.setMatrix(noseSmallDLMatrix);

  var i=0;
  var j=0;
  while (i < 9){
    bigtentl[i].setMatrix(bigtentlMatrix[i]);
    i++;
  }

  while (j < 9){
    bigtentr[j].setMatrix(bigtentrMatrix[j]);
    j++;
  }

  var bcount=0;
  while(bcount < body.length ){
      body[bcount].setMatrix(bodyMatrix[bcount]);
      fbody[bcount].setMatrix(fbodyMatrix[bcount]);
      bcount++;
  }

  var m=0;
  while(m < tails.length ){
      tails[m].setMatrix(tailMatrixs[m]);
      tails[m].setMatrix(tailMatrixs[m]);
      m++;
  }

}


//BACK BODY LOOP
var bcount = 1;
var origin = 4;
var ScalBodyMatrixs = [];
var TransBodyMatrixs = [];
var bodyMatrix=[];
var body = [];

var forigin = 4;
var fScalBodyMatrixs = [];
var fTransBodyMatrixs = [];
var fbodyMatrix = [];
var fbody = [];

while(bcount < 100 ){
  //back body
  var i = 1.4*(1-0.01*bcount);
  var y = 1.4*(1-0.01*bcount);
  var z = 1.4*(1-0.01*bcount);
  var scalbodyMatrix = new THREE.Matrix4().set(i,0,0,0, 
                                                0,y,0,0, 
                                                0,0,z,0, 
                                                0,0,0,1);
  ScalBodyMatrixs.push(scalbodyMatrix);
  origin-=i*(1-0.9);
  var transbodyMatrix = multiplyHelper(torsoMatrix, gettransMatrix(0,0,origin));
  TransBodyMatrixs.push(transbodyMatrix);
  var LoopBodyMatrix = multiplyHelper(transbodyMatrix,scalbodyMatrix);
  bodyMatrix.push(LoopBodyMatrix);

  var LoopBody = new THREE.Mesh(torsoGeometry,normalMaterial);
  LoopBody.setMatrix(LoopBodyMatrix);
  body.push(LoopBody);
  scene.add(LoopBody);

  //HEAD
  var a = 1.4*(1-0.01*bcount);
  var b = 1.4*(1-0.01*bcount);
  var c = 1.4*(1-0.01*bcount);
  var fscalbodyMatrix = new THREE.Matrix4().set(a,0,0,0, 
                                                0,b,0,0, 
                                                0,0,c,0, 
                                                0,0,0,1);
  fScalBodyMatrixs.push(fscalbodyMatrix);
  forigin+=a*(1-0.85);
  var ftransbodyMatrix = multiplyHelper(torsoMatrix, gettransMatrix(0,0,forigin));
  fTransBodyMatrixs.push(ftransbodyMatrix);
  var fLoopBodyMatrix = multiplyHelper(ftransbodyMatrix,fscalbodyMatrix);
  fbodyMatrix.push(fLoopBodyMatrix);
  var fLoopBody = new THREE.Mesh(torsoGeometry,normalMaterial);
  fLoopBody.setMatrix(fLoopBodyMatrix);
  fbody.push(fLoopBody);
  scene.add(fLoopBody);

  bcount++;
}



//TAIL
var count = 1; 
var initialpos = -3.78;
var ScalTailMatrixs =[];
var TransTailMatrixs = [];
//All the tail Matrix is stored here
var tailMatrixs = [];
//All the tail is stored here
var tails = [];
var ip = [];
while (count <= 90){
  var n = 0.2*(1-0.01*count);
  var scalTailMatrix = new THREE.Matrix4().set(n,0,0,0, 
                                                0,n,0,0, 
                                                0,0,n,0, 
                                                0,0,0,1);
  ScalTailMatrixs.push(scalTailMatrix);
  initialpos-=0.1;
  ip.push(initialpos);
  var transTailMatrix = multiplyHelper(torsoMatrix, gettransMatrix(0,0,initialpos));
  TransTailMatrixs.push(transTailMatrix);
  var LoopTailMatrix = multiplyHelper(transTailMatrix,scalTailMatrix);
  tailMatrixs.push(LoopTailMatrix);

  var LoopTail = new THREE.Mesh(torsoGeometry,normalMaterial);
  tails.push(LoopTail);
  LoopTail.setMatrix(LoopTailMatrix);

  scene.add(LoopTail);

  count++;
}



// Make tentacles
var lcount = 1;
var rcount = 1; 
var bigtentlmatrix = [];
var bigtentlMatrix = [];
var bigtentrmatrix = [];
var bigtentrMatrix = [];
var bigtentl = [];
var bigtentr = [];
var scaltentMatrix = getscaleMatrix(0.8,0.03,0.05);


while (lcount <= 9){

var bigtentltmpmatrix= multiplyHelper(nosematrix,gettransMatrix(3,1.2-0.25*lcount,0.8));
bigtentlmatrix.push(bigtentltmpmatrix);
var noseBigMatrix = multiplyHelper(bigtentltmpmatrix,scaltentMatrix);
bigtentlMatrix.push(noseBigMatrix);

var noseBigtentl = new THREE.Mesh(torsoGeometry,normalMaterial);
noseBigtentl.setMatrix(noseBigMatrix);
bigtentl.push(noseBigtentl);

scene.add(noseBigtentl);
lcount++;
}

while (rcount <= 9){

var bigtentrtmpmatrix= multiplyHelper(nosematrix,gettransMatrix(-3,1.2-0.25*rcount,0.8));
bigtentrmatrix.push(bigtentrtmpmatrix);
var noseBigMatrix = multiplyHelper(bigtentrtmpmatrix,scaltentMatrix);
bigtentrMatrix.push(noseBigMatrix);

var noseBigtentr = new THREE.Mesh(torsoGeometry,normalMaterial);
noseBigtentr.setMatrix(noseBigMatrix);
bigtentr.push(noseBigtentr);

scene.add(noseBigtentr);
rcount++;
}




// TO-DO: PUT TOGETHER THE REST OF YOUR STAR-NOSED MOLE AND ADD TO THE SCENE!
// Hint: Hint: Add one piece of geometry at a time, then implement the motion for that part. 
//             Then you can make sure your hierarchy still works properly after each step.



// APPLY DIFFERENT JUMP CUTS/ANIMATIONS TO DIFFERNET KEYS
// Note: The start of "U" animation has been done for you, you must implement the hiearchy and jumpcut.
// Hint: There are other ways to manipulate and grab clock values!!
// Hint: Check THREE.js clock documenation for ideas.
// Hint: It may help to start with a jumpcut and implement the animation after.
// Hint: Where is updateBody() called?
var clock = new THREE.Clock(true);

var p0; // start position or angle
var p1; // end position or angle
var time_length; // total time of animation
var time_start; // start time of animation
var time_end; // end time of animation
var p; // current frame
var animate = false; // animate?

// function init_animation()
// Initializes parameters and sets animate flag to true.
// Input: start position or angle, end position or angle, and total time of animation.
function init_animation(p_start,p_end,t_length){
  resetFcn();
  p0 = p_start;
  p1 = p_end;
  time_length = t_length;
  time_start = clock.getElapsedTime();
  time_end = time_start + time_length;
  animate = true; // flag for animation
  return;
}

var counter = 0;

function updateBody() {
  switch(true)
  {
      case(key == "U" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

     //rotation:
      var rotateZ = getRotMatrix(p,"x");
      var torsoRotMatrix = multiplyHelper(torsoMatrix,rotateZ);

      // var torsoTransMatrix = multiplyHelper(torsoRotMatrix, transMatrix);
      // var RotatedtorsoRotMatrix = multiplyHelper(torsoTransMatrix,rotMatrix);

      var headRotMatrix = multiplyHelper(torsoRotMatrix, head_Matrix);
      head.setMatrix(headRotMatrix);
      
      noseRotMatrix=multiplyHelper(torsoRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);

      noseSmallURRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallURMatrix);
      noseSmallUR.setMatrix(noseSmallURRotMatrix); 

      //noseSmallULRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallULMatrix);
      //noseSmallUL.setMatrix(noseSmallULRotMatrix); 

      //var rotateY = getRotMatrix(p,"z");
      // var torsoRotMatrixY = multiplyHelper(torsoMatrix,rotateY);

      noseSmallULRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallULMatrix);
      noseSmallUL.setMatrix(noseSmallULRotMatrix); 


      noseSmallDRRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallDRMatrix);
      noseSmallDR.setMatrix(noseSmallDRRotMatrix); 

      noseSmallDLRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallDLMatrix);
      noseSmallDL.setMatrix(noseSmallDLRotMatrix);       
      
      for(var index = 0; index < tails.length; index++){
        var tailRotMatrix = multiplyHelper(torsoRotMatrix,TransTailMatrixs[index]);
        var LoopTailRot = multiplyHelper(tailRotMatrix,ScalTailMatrixs[index]);
        tails[index].setMatrix(LoopTailRot);
      }
      //rotations of body


      for(var index = 0; index < bigtentl.length; index++){
        var BigtentRotMatrix = multiplyHelper(torsoRotMatrix,bigtentlMatrix[index]);
        bigtentl[index].setMatrix(BigtentRotMatrix);
      }

      for(var index = 0; index < bigtentr.length; index++){
        var BigtentRotMatrix = multiplyHelper(torsoRotMatrix,bigtentrMatrix[index]);
        bigtentr[index].setMatrix(BigtentRotMatrix);
      }


      for(var index = 0; index < body.length; index++){
        var bodyRotMatrix = multiplyHelper(torsoRotMatrix,TransBodyMatrixs[index]);
        var LoopBodyRot = multiplyHelper(bodyRotMatrix,ScalBodyMatrixs[index]);
        body[index].setMatrix(LoopBodyRot);

      }
        for(var index = 0; index < fbody.length; index++){
        var fbodyRotMatrix = multiplyHelper(torsoRotMatrix,fTransBodyMatrixs[index]);
        var fLoopBodyRot = multiplyHelper(fbodyRotMatrix,fScalBodyMatrixs[index]);
        fbody[index].setMatrix(fLoopBodyRot);

      }

      //rotation of front legs:
      var frontLpalmRotMatrix = multiplyHelper(torsoRotMatrix, frontLpalmMtx);
      frontLpalm.setMatrix(frontLpalmRotMatrix);

      var frontLRotMatrix = multiplyHelper(torsoRotMatrix, frontLMatrix);
      frontLleg.setMatrix(frontLRotMatrix);

      var frontLLRotMatrix = multiplyHelper(torsoRotMatrix, frontLLMatrix);
      frontLLleg.setMatrix(frontLLRotMatrix);

      var frontRRotMatrix = multiplyHelper(torsoRotMatrix, frontRMatrix);
      frontRleg.setMatrix(frontRRotMatrix);

      var frontRLRotMatrix = multiplyHelper(torsoRotMatrix, frontRLMatrix);
      frontRLleg.setMatrix(frontRLRotMatrix);

      var frontLpalmRotMatrix = multiplyHelper(torsoRotMatrix, frontLpalmMtx);
      frontLpalm.setMatrix(frontLpalmRotMatrix);
      //Lpalm.push(rotateZ);

      var frontRpalmRotMatrix = multiplyHelper(torsoRotMatrix, frontRpalmMtx);
      frontRpalm.setMatrix(frontRpalmRotMatrix);

      var frontToe1RotMatrix = multiplyHelper(torsoRotMatrix, frontToe1Matrix);
      frontToe1.setMatrix(frontToe1RotMatrix);

      var frontToe2RotMatrix = multiplyHelper(torsoRotMatrix, frontToe2Matrix);
      frontToe2.setMatrix(frontToe2RotMatrix);

      var frontToe3RotMatrix = multiplyHelper(torsoRotMatrix, frontToe3Matrix);
      frontToe3.setMatrix(frontToe3RotMatrix);

      var frontToe4RotMatrix = multiplyHelper(torsoRotMatrix, frontToe4Matrix);
      frontToe4.setMatrix(frontToe4RotMatrix);

      var frontToe5RotMatrix = multiplyHelper(torsoRotMatrix, frontToe5Matrix);
      frontToe5.setMatrix(frontToe5RotMatrix);

      var frontToe6RotMatrix = multiplyHelper(torsoRotMatrix, frontToe6Matrix);
      frontToe6.setMatrix(frontToe6RotMatrix);

      var frontToe7RotMatrix = multiplyHelper(torsoRotMatrix, frontToe7Matrix);
      frontToe7.setMatrix(frontToe7RotMatrix);

      var frontToe8RotMatrix = multiplyHelper(torsoRotMatrix, frontToe8Matrix);
      frontToe8.setMatrix(frontToe8RotMatrix);

      var frontToe9RotMatrix = multiplyHelper(torsoRotMatrix, frontToe9Matrix);
      frontToe9.setMatrix(frontToe9RotMatrix);

      var frontToe10RotMatrix = multiplyHelper(torsoRotMatrix, frontToe10Matrix);
      frontToe10.setMatrix(frontToe10RotMatrix);
      // var head2torsoRotMatrix = multiplyHelper(torsoRotMatrix,head2torsoMatrix);

      // torso.setMatrix(RotatedtorsoRotMatrix); 
      // head2torso.setMatrix(head2torsoRotMatrix);
      break;

     case(key == "E" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

     //rotation:
      var rotateZ = getRotMatrix(p,"x");
      var torsoRotMatrix = multiplyHelper(torsoMatrix,rotateZ);

      // var torsoTransMatrix = multiplyHelper(torsoRotMatrix, transMatrix);
      // var RotatedtorsoRotMatrix = multiplyHelper(torsoTransMatrix,rotMatrix);

      var headRotMatrix = multiplyHelper(torsoRotMatrix, head_Matrix);
      head.setMatrix(headRotMatrix);
      
      noseRotMatrix=multiplyHelper(torsoRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);

      noseSmallURRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallURMatrix);
      noseSmallUR.setMatrix(noseSmallURRotMatrix); 

      //noseSmallULRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallULMatrix);
      //noseSmallUL.setMatrix(noseSmallULRotMatrix); 

      //var rotateY = getRotMatrix(p,"z");
      // var torsoRotMatrixY = multiplyHelper(torsoMatrix,rotateY);

      noseSmallULRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallULMatrix);
      noseSmallUL.setMatrix(noseSmallULRotMatrix); 


      noseSmallDRRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallDRMatrix);
      noseSmallDR.setMatrix(noseSmallDRRotMatrix); 

      noseSmallDLRotMatrix=multiplyHelper(torsoRotMatrix,noseSmallDLMatrix);
      noseSmallDL.setMatrix(noseSmallDLRotMatrix);       
      
      for(var index = 0; index < tails.length; index++){
        var tailRotMatrix = multiplyHelper(torsoRotMatrix,TransTailMatrixs[index]);
        var LoopTailRot = multiplyHelper(tailRotMatrix,ScalTailMatrixs[index]);
        tails[index].setMatrix(LoopTailRot);
      }
      //rotations of body

      for(var index = 0; index < bigtentl.length; index++){
        var BigtentRotMatrix = multiplyHelper(torsoRotMatrix,bigtentlMatrix[index]);
        bigtentl[index].setMatrix(BigtentRotMatrix);
      }

      for(var index = 0; index < bigtentr.length; index++){
        var BigtentRotMatrix = multiplyHelper(torsoRotMatrix,bigtentrMatrix[index]);
        bigtentr[index].setMatrix(BigtentRotMatrix);
      }

      for(var index = 0; index < body.length; index++){
        var bodyRotMatrix = multiplyHelper(torsoRotMatrix,TransBodyMatrixs[index]);
        var LoopBodyRot = multiplyHelper(bodyRotMatrix,ScalBodyMatrixs[index]);
        body[index].setMatrix(LoopBodyRot);

      }
        for(var index = 0; index < fbody.length; index++){
        var fbodyRotMatrix = multiplyHelper(torsoRotMatrix,fTransBodyMatrixs[index]);
        var fLoopBodyRot = multiplyHelper(fbodyRotMatrix,fScalBodyMatrixs[index]);
        fbody[index].setMatrix(fLoopBodyRot);

      }

      //rotation of front legs:
      var frontLpalmRotMatrix = multiplyHelper(torsoRotMatrix, frontLpalmMtx);
      frontLpalm.setMatrix(frontLpalmRotMatrix);

      var frontLRotMatrix = multiplyHelper(torsoRotMatrix, frontLMatrix);
      frontLleg.setMatrix(frontLRotMatrix);

      var frontLLRotMatrix = multiplyHelper(torsoRotMatrix, frontLLMatrix);
      frontLLleg.setMatrix(frontLLRotMatrix);

      var frontRRotMatrix = multiplyHelper(torsoRotMatrix, frontRMatrix);
      frontRleg.setMatrix(frontRRotMatrix);

      var frontRLRotMatrix = multiplyHelper(torsoRotMatrix, frontRLMatrix);
      frontRLleg.setMatrix(frontRLRotMatrix);

      var frontLpalmRotMatrix = multiplyHelper(torsoRotMatrix, frontLpalmMtx);
      frontLpalm.setMatrix(frontLpalmRotMatrix);
      //Lpalm.push(rotateZ);

      var frontRpalmRotMatrix = multiplyHelper(torsoRotMatrix, frontRpalmMtx);
      frontRpalm.setMatrix(frontRpalmRotMatrix);

      var frontToe1RotMatrix = multiplyHelper(torsoRotMatrix, frontToe1Matrix);
      frontToe1.setMatrix(frontToe1RotMatrix);

      var frontToe2RotMatrix = multiplyHelper(torsoRotMatrix, frontToe2Matrix);
      frontToe2.setMatrix(frontToe2RotMatrix);

      var frontToe3RotMatrix = multiplyHelper(torsoRotMatrix, frontToe3Matrix);
      frontToe3.setMatrix(frontToe3RotMatrix);

      var frontToe4RotMatrix = multiplyHelper(torsoRotMatrix, frontToe4Matrix);
      frontToe4.setMatrix(frontToe4RotMatrix);

      var frontToe5RotMatrix = multiplyHelper(torsoRotMatrix, frontToe5Matrix);
      frontToe5.setMatrix(frontToe5RotMatrix);

      var frontToe6RotMatrix = multiplyHelper(torsoRotMatrix, frontToe6Matrix);
      frontToe6.setMatrix(frontToe6RotMatrix);

      var frontToe7RotMatrix = multiplyHelper(torsoRotMatrix, frontToe7Matrix);
      frontToe7.setMatrix(frontToe7RotMatrix);

      var frontToe8RotMatrix = multiplyHelper(torsoRotMatrix, frontToe8Matrix);
      frontToe8.setMatrix(frontToe8RotMatrix);

      var frontToe9RotMatrix = multiplyHelper(torsoRotMatrix, frontToe9Matrix);
      frontToe9.setMatrix(frontToe9RotMatrix);

      var frontToe10RotMatrix = multiplyHelper(torsoRotMatrix, frontToe10Matrix);
      frontToe10.setMatrix(frontToe10RotMatrix);
      // var head2torsoRotMatrix = multiplyHelper(torsoRotMatrix,head2torsoMatrix);

      // torso.setMatrix(RotatedtorsoRotMatrix); 
      // head2torso.setMatrix(head2torsoRotMatrix);
      break;

      // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
      // Note: Remember spacebar sets jumpcut/animate   


      // CLICK ON "P" WILL ROTATE THE TOE
      case(key == "P" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  

      var rotateX = getRotMatrix(p,"x");
      //rotation of left palm
      var r2 = multiplyHelper(frontLpalmtransMtx,rotateX);
      frontLpalmMtx = multiplyHelper(r2,frontpalmscalMtx);
      //torso.setMatrix(torsoRotMatrix); 
      frontLpalm.setMatrix(frontLpalmMtx);

      //rotation of left toes
      var r01 =  multiplyHelper(r2, gettransMatrix(0.8,0,1.5));
      frontToe1Matrix = multiplyHelper(r01, frontToescal);
      frontToe1.setMatrix(frontToe1Matrix);

      var r02 =  multiplyHelper(r2, gettransMatrix(0.4,0,1.5));
      frontToe2Matrix = multiplyHelper(r02, frontToescal);
      frontToe2.setMatrix(frontToe2Matrix);

      var r03 =  multiplyHelper(r2, gettransMatrix(0,0,1.5));
      frontToe3Matrix = multiplyHelper(r03, frontToescal);
      frontToe3.setMatrix(frontToe3Matrix);

      var r04 =  multiplyHelper(r2, gettransMatrix(-0.4,0,1.5));
      frontToe4Matrix = multiplyHelper(r04, frontToescal);
      frontToe4.setMatrix(frontToe4Matrix);

      var r05 =  multiplyHelper(r2, gettransMatrix(-0.8,0,1.5));
      frontToe5Matrix = multiplyHelper(r05, frontToescal);
      frontToe5.setMatrix(frontToe5Matrix);

      //BACK TOES

      var r3 = multiplyHelper(RpalmtransMtx,rotateX);
      RpalmMtx = multiplyHelper(r3,palmscalMtx);
      //torso.setMatrix(torsoRotMatrix); 
      Rpalm.setMatrix(RpalmMtx);

      //rotation of left toes
      var r06 =  multiplyHelper(r3, gettransMatrix(-0.4,0,1.5));
      backToe6Matrix = multiplyHelper(r06, backToescal);
      backToe6.setMatrix(backToe6Matrix);


      var r07 =  multiplyHelper(r3, gettransMatrix(-0.2,0,1.5));
      backToe7Matrix = multiplyHelper(r07, backToescal);
      backToe7.setMatrix(backToe7Matrix);

      var r08 =  multiplyHelper(r3, gettransMatrix(0,0,1.5));
      backToe8Matrix = multiplyHelper(r08, backToescal);
      backToe8.setMatrix(backToe8Matrix);

      var r09 =  multiplyHelper(r3, gettransMatrix(0.2,0,1.5));
      backToe9Matrix = multiplyHelper(r09, backToescal);
      backToe9.setMatrix(backToe9Matrix);

      var r10 =  multiplyHelper(r3, gettransMatrix(0.4,0,1.5));
      backToe10Matrix = multiplyHelper(r10, backToescal);
      backToe10.setMatrix(backToe10Matrix);

      break;



      case(key == "I" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  

      var rotateY = getRotMatrix(p,"x");
      //rotation of left palm
      var r4 = multiplyHelper(frontRpalmtransMtx,rotateY);
      frontRpalmMtx = multiplyHelper(r4,frontpalmscalMtx);
      //torso.setMatrix(torsoRotMatrix); 
      frontRpalm.setMatrix(frontRpalmMtx);

      //rotation of left toes
      var r01 =  multiplyHelper(r4, gettransMatrix(0.8,0,1.5));
      frontToe6Matrix = multiplyHelper(r01, frontToescal);
      frontToe6.setMatrix(frontToe6Matrix);

      var r02 =  multiplyHelper(r4, gettransMatrix(0.4,0,1.5));
      frontToe7Matrix = multiplyHelper(r02, frontToescal);
      frontToe7.setMatrix(frontToe7Matrix);

      var r03 =  multiplyHelper(r4, gettransMatrix(0,0,1.5));
      frontToe8Matrix = multiplyHelper(r03, frontToescal);
      frontToe8.setMatrix(frontToe8Matrix);

      var r04 =  multiplyHelper(r4, gettransMatrix(-0.4,0,1.5));
      frontToe9Matrix = multiplyHelper(r04, frontToescal);
      frontToe9.setMatrix(frontToe9Matrix);

      var r05 =  multiplyHelper(r4, gettransMatrix(-0.8,0,1.5));
      frontToe10Matrix = multiplyHelper(r05, frontToescal);
      frontToe10.setMatrix(frontToe10Matrix);

      //BACK TOES

      var r5 = multiplyHelper(LpalmtransMtx,rotateY);
      LpalmMtx = multiplyHelper(r5,palmscalMtx);
      //torso.setMatrix(torsoRotMatrix); 
      Lpalm.setMatrix(LpalmMtx);

      //rotation of left toes
      var r06 =  multiplyHelper(r5, gettransMatrix(-0.4,0,1.5));
      backToe1Matrix = multiplyHelper(r06, backToescal);
      backToe1.setMatrix(backToe1Matrix);


      var r07 =  multiplyHelper(r5, gettransMatrix(-0.2,0,1.5));
      backToe2Matrix = multiplyHelper(r07, backToescal);
      backToe2.setMatrix(backToe2Matrix);

      var r08 =  multiplyHelper(r5, gettransMatrix(0,0,1.5));
      backToe3Matrix = multiplyHelper(r08, backToescal);
      backToe3.setMatrix(backToe3Matrix);

      var r09 =  multiplyHelper(r5, gettransMatrix(0.2,0,1.5));
      backToe4Matrix = multiplyHelper(r09, backToescal);
      backToe4.setMatrix(backToe4Matrix);

      var r10 =  multiplyHelper(r5, gettransMatrix(0.4,0,1.5));
      backToe5Matrix = multiplyHelper(r10, backToescal);
      backToe5.setMatrix(backToe5Matrix);

      break;

      case(key == "N" && animate):

       var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  


      var rotateY = getRotMatrix(2*p,"y");
      var rotateL = getRotMatrix(-2*p,"y");
      var rotateD = getRotMatrix(2*p,"x");
      var rotateU = getRotMatrix(-2*p,"x");

      for(var i = 0; i < bigtentl.length; i++){
         var tmp=multiplyHelper(bigtentlmatrix[i],gettransMatrix(-2,-1.2+0.25*lcount,-0.8));
        var tmp1=multiplyHelper(tmp,rotateY);
        var tmp2= multiplyHelper(tmp1,gettransMatrix(2,1.2-0.25*lcount,0.8));
        var tmp3=multiplyHelper(tmp2,scaltentMatrix);
        bigtentl[i].setMatrix(tmp3);
      }

      for(var i = 0; i < bigtentr.length; i++){
         var tmp=multiplyHelper(bigtentrmatrix[i],gettransMatrix(2,-1.2+0.25*lcount,-0.8));
        var tmp1=multiplyHelper(tmp,rotateL);
        var tmp2= multiplyHelper(tmp1,gettransMatrix(-2,1.2-0.25*lcount,0.8));
        var tmp3=multiplyHelper(tmp2,scaltentMatrix);
        bigtentr[i].setMatrix(tmp3);
      }

        var tmp=multiplyHelper(noseSmallURtransMatrix,rotateD);
        var tmp1=multiplyHelper(tmp,noseSmallscalMatrix);    
        noseSmallUR.setMatrix(tmp1);

        var tmp=multiplyHelper(noseSmallULtransMatrix,rotateD);
        var tmp1=multiplyHelper(tmp,noseSmallscalMatrix);    
        noseSmallUL.setMatrix(tmp1);

        var tmp=multiplyHelper(noseSmallDRtransMatrix,rotateU);
        var tmp1=multiplyHelper(tmp,noseSmallscalMatrix);    
        noseSmallDR.setMatrix(tmp1);

        var tmp=multiplyHelper(noseSmallDLtransMatrix,rotateU);
        var tmp1=multiplyHelper(tmp,noseSmallscalMatrix);    
        noseSmallDL.setMatrix(tmp1);    

      break;

      case(key == "H" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  

      var rotateY = getRotMatrix(p,"y"); 

      // for(var index = 0; index < noseinterMatrix.length; index++){
      //   var tmp1 = multiplyHelper(noseinterMatrix[index],rotateY);
      //   var tmp2 = multiplyHelper(tmp1,scaltentMatrix);
      //   bigtent[index].setMatrix(tmp2);
      // }

      //var headRot = multiplyHelper(torsoMatrix, rotateY);

      var headorigin = multiplyHelper(headMatrix, gettransMatrix(0,0,-3));
      var headRotMatrix = multiplyHelper(headorigin, rotateY);
      var BackheadRotMatrix = multiplyHelper(headRotMatrix, gettransMatrix(0,0,3));
      var headrot = multiplyHelper(BackheadRotMatrix, headscal);
      head.setMatrix(headrot);

      var noseRot1 = multiplyHelper(BackheadRotMatrix, nosetransMatrix);
      var noseRot2 = multiplyHelper(noseRot1, nosescalMatrix);
      nose.setMatrix(noseRot2);

      // noseSmallURRotMatrix=multiplyHelper(torsoRot,noseSmallURMatrix);
      // noseSmallUR.setMatrix(noseSmallURRotMatrix); 


      var noseSmallURRot1 = multiplyHelper(noseRot1, gettransMatrix(0,1.5,0.75));
      var noseSmallURRot2 = multiplyHelper(noseSmallURRot1, noseSmallscalMatrix);
      noseSmallUR.setMatrix(noseSmallURRot2);


      var noseSmallULRot1 = multiplyHelper(noseRot1, gettransMatrix(-0.5,1.5,0.75));
      var noseSmallULRot2 = multiplyHelper(noseSmallULRot1, noseSmallscalMatrix);
      noseSmallUL.setMatrix(noseSmallULRot2); 

      var noseSmallDRRot1 = multiplyHelper(noseRot1,gettransMatrix(0,-1.5,0.75));
      var noseSmallDRRot2 = multiplyHelper(noseSmallDRRot1, noseSmallscalMatrix);
      noseSmallDR.setMatrix(noseSmallDRRot2); 

      var noseSmallDLRot1 = multiplyHelper(noseRot1,gettransMatrix(-0.5,-1.5,0.75));
      var noseSmallDLRot2 = multiplyHelper(noseSmallDLRot1, noseSmallscalMatrix);
      noseSmallDL.setMatrix(noseSmallDLRot2); 

      for(var index = 1; index <= bigtentl.length; index++){
        var tentlRot1 = multiplyHelper(noseRot1,gettransMatrix(3,1.2-0.25*index,0.8));
        var tentlRot2 = multiplyHelper(tentlRot1, scaltentMatrix);
        bigtentl[index-1].setMatrix(tentlRot2);
      }


      for(var index = 1; index <= bigtentr.length; index++){
        var tentrRot1 = multiplyHelper(noseRot1,gettransMatrix(-3,1.2-0.25*index,0.8));
        var tentrRot2 = multiplyHelper(tentrRot1, scaltentMatrix);
        bigtentr[index-1].setMatrix(tentrRot2);
      }
      // for(var index =  Math.floor(4*fbody.length/7) ; index < fbody.length; index++){
      // var tmp3 = multiplyHelper(torsoRot,fTransBodyMatrixs[index]);
      // var tmp4 = multiplyHelper(tmp3,fScalBodyMatrixs[index]);
      // fbody[index].setMatrix(tmp4);
      // }


      break;


       case(key == "G" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
}


      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  

      var rotateY = getRotMatrix(-p,"y"); 

      var headorigin = multiplyHelper(headMatrix, gettransMatrix(0,0,-3));
      var headRotMatrix = multiplyHelper(headorigin, rotateY);
      var BackheadRotMatrix = multiplyHelper(headRotMatrix, gettransMatrix(0,0,3));
      var headrot = multiplyHelper(BackheadRotMatrix, headscal);
      head.setMatrix(headrot);

      var noseRot1 = multiplyHelper(BackheadRotMatrix, nosetransMatrix);
      var noseRot2 = multiplyHelper(noseRot1, nosescalMatrix);
      nose.setMatrix(noseRot2);

      var noseSmallURRot1 = multiplyHelper(noseRot1, gettransMatrix(0,1.5,0.75));
      var noseSmallURRot2 = multiplyHelper(noseSmallURRot1, noseSmallscalMatrix);
      noseSmallUR.setMatrix(noseSmallURRot2);


      var noseSmallULRot1 = multiplyHelper(noseRot1, gettransMatrix(-0.5,1.5,0.75));
      var noseSmallULRot2 = multiplyHelper(noseSmallULRot1, noseSmallscalMatrix);
      noseSmallUL.setMatrix(noseSmallULRot2); 

      var noseSmallDRRot1 = multiplyHelper(noseRot1,gettransMatrix(0,-1.5,0.75));
      var noseSmallDRRot2 = multiplyHelper(noseSmallDRRot1, noseSmallscalMatrix);
      noseSmallDR.setMatrix(noseSmallDRRot2); 

      var noseSmallDLRot1 = multiplyHelper(noseRot1,gettransMatrix(-0.5,-1.5,0.75));
      var noseSmallDLRot2 = multiplyHelper(noseSmallDLRot1, noseSmallscalMatrix);
      noseSmallDL.setMatrix(noseSmallDLRot2); 

      for(var index = 1; index <= bigtentl.length; index++){
        var tentlRot1 = multiplyHelper(noseRot1,gettransMatrix(3,1.2-0.25*index,0.8));
        var tentlRot2 = multiplyHelper(tentlRot1, scaltentMatrix);
        bigtentl[index-1].setMatrix(tentlRot2);
      }


      for(var index = 1; index <= bigtentr.length; index++){
        var tentrRot1 = multiplyHelper(noseRot1,gettransMatrix(-3,1.2-0.25*index,0.8));
        var tentrRot2 = multiplyHelper(tentrRot1, scaltentMatrix);
        bigtentr[index-1].setMatrix(tentrRot2);
      }

      break;

      case(key == "T" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
}


      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  

      var rotateY = getRotMatrix(-p,"y"); 
      for(var index = 0; index < tails.length; index++){
      var temp1 = multiplyHelper(tailMatrixs[index], gettransMatrix(0,0,-(ip[index]+3.78)));
      var temp2 = multiplyHelper( rotateY,temp1);
      var temp3= multiplyHelper(temp2, gettransMatrix(0,0,(ip[index]+3.78)));
      tails[index].setMatrix(temp3);

    }
      break;

      case(key == "V" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
}


      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  

      var rotateY = getRotMatrix(p,"y"); 
      for(var index = 0; index < tails.length; index++){
      var temp1 = multiplyHelper(tailMatrixs[index], gettransMatrix(0,0,(ip[index]+5)));
      var temp2 = multiplyHelper(rotateY,temp1);
      var temp3= multiplyHelper(temp2, gettransMatrix(0,0,-(ip[index]+5)));
      tails[index].setMatrix(temp3);

    }
      break;


      //DIGGING
      case(key == "D" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
}

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  


      var rotateX = getRotMatrix(p,"x");

      //rotation of left palm
      var r2 = multiplyHelper(frontLpalmtransMtx,rotateX);
      //var r2rot = multiplyHelper(frontLpalmtransMtx,rotateXX);
      frontLpalmMtx = multiplyHelper(r2,frontpalmscalMtx);
      //torso.setMatrix(torsoRotMatrix); 
      frontLpalm.setMatrix(frontLpalmMtx);

      //rotation of left toes
      var r01 =  multiplyHelper(r2, gettransMatrix(0,0,1.5-0.5));
      var rot1 = multiplyHelper(r01, rotateX);
      var rot_1 = multiplyHelper(rot1, gettransMatrix(0.8,0,0.5));
      var toe1Rot = multiplyHelper(rot_1, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe1.setMatrix(toe1Rot);

      var r02 =  multiplyHelper(r2, gettransMatrix(0,0,1.5-0.5));
      var rot2 = multiplyHelper(r02, rotateX);
      var rot_2 = multiplyHelper(rot2, gettransMatrix(0.4,0,0.5));
      var toe2Rot = multiplyHelper(rot_2, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe2.setMatrix(toe2Rot);

      var r03 =  multiplyHelper(r2, gettransMatrix(0,0,1.5-0.5));
      var rot3 = multiplyHelper(r03, rotateX);
      var rot_3 = multiplyHelper(rot3, gettransMatrix(0,0,0.5));
      var toe3Rot = multiplyHelper(rot_3, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe3.setMatrix(toe3Rot);

      var r04 =  multiplyHelper(r2, gettransMatrix(0,0,1.5-0.5));
      var rot4 = multiplyHelper(r04, rotateX);
      var rot_4 = multiplyHelper(rot4, gettransMatrix(-0.4,0,0.5));
      var toe4Rot = multiplyHelper(rot_4, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe4.setMatrix(toe4Rot);

      var r05 =  multiplyHelper(r2, gettransMatrix(0,0,1.5-0.5));
      var rot5 = multiplyHelper(r05, rotateX);
      var rot_5 = multiplyHelper(rot5, gettransMatrix(-0.8,0,0.5));
      var toe5Rot = multiplyHelper(rot_5, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe5.setMatrix(toe5Rot);

      //BACK TOES

      var r3 = multiplyHelper(frontRpalmtransMtx,rotateX);
      frontRpalmMtx = multiplyHelper(r3,frontpalmscalMtx);
      //torso.setMatrix(torsoRotMatrix); 
      frontRpalm.setMatrix(frontRpalmMtx);

      //rotation of left toes
      var r06 =  multiplyHelper(r3, gettransMatrix(0,0,1.5-0.5));
      var rot6 = multiplyHelper(r06, rotateX);
      var rot_6 = multiplyHelper(rot6, gettransMatrix(-0.8,0,0.5));
      var toe6Rot = multiplyHelper(rot_6, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe6.setMatrix(toe6Rot);


      var r07 =  multiplyHelper(r3, gettransMatrix(0,0,1.5-0.5));
      var rot7 = multiplyHelper(r07, rotateX);
      var rot_7 = multiplyHelper(rot7, gettransMatrix(-0.4,0,0.5));
      var toe7Rot = multiplyHelper(rot_7, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe7.setMatrix(toe7Rot);

      var r08 =  multiplyHelper(r3, gettransMatrix(0,0,1.5-0.5));
      var rot8 = multiplyHelper(r08, rotateX);
      var rot_8 = multiplyHelper(rot8, gettransMatrix(0,0,0.5));
      var toe8Rot = multiplyHelper(rot_8, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe8.setMatrix(toe8Rot);

      var r09 =  multiplyHelper(r3, gettransMatrix(0,0,1.5-0.5));
      var rot9 = multiplyHelper(r09, rotateX);
      var rot_9 = multiplyHelper(rot9, gettransMatrix(0.4,0,0.5));
      var toe9Rot = multiplyHelper(rot_9, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe9.setMatrix(toe9Rot);

      var r10 =  multiplyHelper(r3, gettransMatrix(0,0,1.5-0.5));
      var rot10 = multiplyHelper(r10, rotateX);
      var rot_10 = multiplyHelper(rot10, gettransMatrix(0.8,0,0.5));
      var toe10Rot = multiplyHelper(rot_10, frontToescal);
      // var r01 = getRotToe(0.8,0,1.5,rotateX, r2,frontToeScal);
      frontToe10.setMatrix(toe10Rot);

      break;

      //SWIMMING
      case(key == "S" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p= (p1 - p0)*((time-time_start)/time_length) + p0; // current frame  


      var rotateX = getRotMatrix(-p,"x"); 

      //FRONT LEFT LEG AND BACK RIGHT LEG
      var r1 = multiplyHelper(frontLtransMatrix, gettransMatrix(-1,1,-1));
      var r2 = multiplyHelper(r1, rotateX);
      var r3 = multiplyHelper(r2, gettransMatrix(1,-1,1));
      var r4 = multiplyHelper(r3, frontscalMatrix);
      frontLleg.setMatrix(r4);

      var frontknee1 = multiplyHelper(r3, gettransMatrix(0,-1,0));
      var frontknee2 = multiplyHelper(frontknee1, frontLscalMatrix);
      frontLLleg.setMatrix(frontknee2);

      var frontpalm1 = multiplyHelper(r3, frontLpalmMatrix);
      var frontpalm2 = multiplyHelper(frontpalm1, frontpalmscalMtx);
      frontLpalm.setMatrix(frontpalm2);

      var fronttoe1_1 = multiplyHelper(frontpalm1, gettransMatrix(0.8,0,1.5));
      var fronttoe1_2 = multiplyHelper(fronttoe1_1, frontToescal);
      frontToe1.setMatrix(fronttoe1_2);

      var fronttoe2_1 = multiplyHelper(frontpalm1, gettransMatrix(0.4,0,1.5));
      var fronttoe2_2 = multiplyHelper(fronttoe2_1, frontToescal);
      frontToe2.setMatrix(fronttoe2_2);

      var fronttoe3_1 = multiplyHelper(frontpalm1, gettransMatrix(0,0,1.5));
      var fronttoe3_2 = multiplyHelper(fronttoe3_1, frontToescal);
      frontToe3.setMatrix(fronttoe3_2);

      var fronttoe4_1 = multiplyHelper(frontpalm1, gettransMatrix(-0.4,0,1.5));
      var fronttoe4_2 = multiplyHelper(fronttoe4_1, frontToescal);
      frontToe4.setMatrix(fronttoe4_2);

      var fronttoe5_1 = multiplyHelper(frontpalm1, gettransMatrix(-0.8,0,1.5));
      var fronttoe5_2 = multiplyHelper(fronttoe5_1, frontToescal);
      frontToe5.setMatrix(fronttoe5_2);

      var back_r1 = multiplyHelper(RlegtransMatrix, gettransMatrix(1,1,1));
      var back_r2 = multiplyHelper(back_r1, rotateX);
      var back_r3 = multiplyHelper(back_r2, gettransMatrix(-1,-1,-1));
      var back_r4 = multiplyHelper(back_r3, legscalMatrix);
      Rleg.setMatrix(back_r4);

      var backknee1 = multiplyHelper(back_r3, gettransMatrix(0.2,-1.5,0));
      var backknee2 = multiplyHelper(backknee1, smllegscalMatrix);
      Rsmlleg.setMatrix(backknee2);

      var backpalm1 = multiplyHelper(back_r3, backRpalmMatrix);
      var backpalm2 = multiplyHelper(backpalm1, palmscalMtx);
      Rpalm.setMatrix(backpalm2);

      var backlowerknee1 = multiplyHelper(back_r3, gettransMatrix(0.2,-2.2,0));
      var backlowerknee2 = multiplyHelper(backlowerknee1, lowerlegscalMatrix);
      Rlowerleg.setMatrix(backlowerknee2);

      var backtoe6_1 = multiplyHelper(backpalm1, gettransMatrix(-0.4,-0.1,1.5));
      var backtoe6_2 = multiplyHelper(backtoe6_1, backToescal);
      backToe6.setMatrix(backtoe6_2);

      var backtoe7_1 = multiplyHelper(backpalm1, gettransMatrix(-0.2,-0.1,1.5));
      var backtoe7_2 = multiplyHelper(backtoe7_1, backToescal);
      backToe7.setMatrix(backtoe7_2);

      var backtoe8_1 = multiplyHelper(backpalm1, gettransMatrix(0,-0.1,1.5));
      var backtoe8_2 = multiplyHelper(backtoe8_1, backToescal);
      backToe8.setMatrix(backtoe8_2);

      var backtoe9_1 = multiplyHelper(backpalm1, gettransMatrix(0.2,-0.1,1.5));
      var backtoe9_2 = multiplyHelper(backtoe9_1, backToescal);
      backToe9.setMatrix(backtoe9_2);

      var backtoe10_1 = multiplyHelper(backpalm1, gettransMatrix(0.4,-0.1,1.5));
      var backtoe10_2 = multiplyHelper(backtoe10_1, backToescal);
      backToe10.setMatrix(backtoe10_2);

      // FRONT RIGHT LEG AND BACK LEFT LEG
      var rotateY = getRotMatrix(p,"x"); 
      var r1_R = multiplyHelper(frontRtransMatrix, gettransMatrix(-1,1,-1));
      var r2_R = multiplyHelper(r1_R, rotateY);
      var r3_R = multiplyHelper(r2_R, gettransMatrix(1,-1,1));
      var r4_R = multiplyHelper(r3_R, frontscalMatrix);
      frontRleg.setMatrix(r4_R);

      var frontkneeR1 = multiplyHelper(r3_R, gettransMatrix(0,-1,0));
      var frontkneeR2 = multiplyHelper(frontkneeR1, frontLscalMatrix);
      frontRLleg.setMatrix(frontkneeR2);

      var frontpalmR1 = multiplyHelper(r3_R, frontRpalmMatrix);
      var frontpalmR2 = multiplyHelper(frontpalmR1, frontpalmscalMtx);
      frontRpalm.setMatrix(frontpalmR2);

      var fronttoe6_1 = multiplyHelper(frontpalmR1, gettransMatrix(-0.8,0,1.5));
      var fronttoe6_2 = multiplyHelper(fronttoe6_1, frontToescal);
      frontToe6.setMatrix(fronttoe6_2);

      var fronttoe7_1 = multiplyHelper(frontpalmR1, gettransMatrix(-0.4,0,1.5));
      var fronttoe7_2 = multiplyHelper(fronttoe7_1, frontToescal);
      frontToe7.setMatrix(fronttoe7_2);

      var fronttoe8_1 = multiplyHelper(frontpalmR1, gettransMatrix(0,0,1.5));
      var fronttoe8_2 = multiplyHelper(fronttoe8_1, frontToescal);
      frontToe8.setMatrix(fronttoe8_2);

      var fronttoe9_1 = multiplyHelper(frontpalmR1, gettransMatrix(0.4,0,1.5));
      var fronttoe9_2 = multiplyHelper(fronttoe9_1, frontToescal);
      frontToe9.setMatrix(fronttoe9_2);

      var fronttoe10_1 = multiplyHelper(frontpalmR1, gettransMatrix(0.8,0,1.5));
      var fronttoe10_2 = multiplyHelper(fronttoe10_1, frontToescal);
      frontToe10.setMatrix(fronttoe10_2);


      var back_l1 = multiplyHelper(LlegtransMatrix, gettransMatrix(1,1,1));
      var back_l2 = multiplyHelper(back_l1, rotateY);
      var back_l3 = multiplyHelper(back_l2, gettransMatrix(-1,-1,-1));
      var back_l4 = multiplyHelper(back_l3, legscalMatrix);
      Lleg.setMatrix(back_l4);

      var backkneeL1 = multiplyHelper(back_l3, gettransMatrix(0.2,-1.5,0));
      var backkneeL2 = multiplyHelper(backkneeL1, smllegscalMatrix);
      Lsmlleg.setMatrix(backkneeL2);

      var backpalmL1 = multiplyHelper(back_l3, backLpalmMatrix);
      var backpalmL2 = multiplyHelper(backpalmL1, palmscalMtx);
      Lpalm.setMatrix(backpalmL2);

      var backlowerkneeL1 = multiplyHelper(back_l3, gettransMatrix(0.2,-2.2,0));
      var backlowerkneeL2 = multiplyHelper(backlowerkneeL1, lowerlegscalMatrix);
      Llowerleg.setMatrix(backlowerkneeL2);

      var backtoe1_1 = multiplyHelper(backpalmL1, gettransMatrix(0.4,-0.1,1.5));
      var backtoe1_2 = multiplyHelper(backtoe1_1, backToescal);
      backToe1.setMatrix(backtoe1_2);

      var backtoe2_1 = multiplyHelper(backpalmL1, gettransMatrix(0.2,-0.1,1.5));
      var backtoe2_2 = multiplyHelper(backtoe2_1, backToescal);
      backToe2.setMatrix(backtoe2_2);

      var backtoe3_1 = multiplyHelper(backpalmL1, gettransMatrix(0,-0.1,1.5));
      var backtoe3_2 = multiplyHelper(backtoe3_1, backToescal);
      backToe3.setMatrix(backtoe3_2);

      var backtoe4_1 = multiplyHelper(backpalmL1, gettransMatrix(-0.2,-0.1,1.5));
      var backtoe4_2 = multiplyHelper(backtoe4_1, backToescal);
      backToe4.setMatrix(backtoe4_2);

      var backtoe5_1 = multiplyHelper(backpalmL1, gettransMatrix(-0.4,-0.1,1.5));
      var backtoe5_2 = multiplyHelper(backtoe5_1, backToescal);
      backToe5.setMatrix(backtoe5_2);



      //head and nose swim

      var rotateY = getRotMatrix(p,"y"); 
      var rotateD = getRotMatrix(-p,"x");
      var rotateU = getRotMatrix(p,"x");
      var rotateL = getRotMatrix(-p,"y"); 
      var rotateR = getRotMatrix(p,"y"); 

      var headorigin = multiplyHelper(headMatrix, gettransMatrix(0,0,-3));
      var headRotMatrix = multiplyHelper(headorigin, rotateY);
      var BackheadRotMatrix = multiplyHelper(headRotMatrix, gettransMatrix(0,0,3));
      var headrot = multiplyHelper(BackheadRotMatrix, headscal);
      head.setMatrix(headrot);

      var noseRot1 = multiplyHelper(BackheadRotMatrix, nosetransMatrix);
      var noseRot2 = multiplyHelper(noseRot1, nosescalMatrix);
      nose.setMatrix(noseRot2);

      // noseSmallURRotMatrix=multiplyHelper(torsoRot,noseSmallURMatrix);
      // noseSmallUR.setMatrix(noseSmallURRotMatrix); 


     //if (p0 === 0){
      var noseSmallURRot1 = multiplyHelper(noseRot1, gettransMatrix(0,1.5,0.75));
      var test = multiplyHelper(noseSmallURRot1, rotateD);
      var noseSmallURRot2 = multiplyHelper(test, noseSmallscalMatrix);
      noseSmallUR.setMatrix(noseSmallURRot2);

      var noseSmallULRot1 = multiplyHelper(noseRot1, gettransMatrix(-0.5,1.5,0.75));
      var test = multiplyHelper(noseSmallULRot1, rotateD);
      var noseSmallULRot2 = multiplyHelper(test, noseSmallscalMatrix);
      noseSmallUL.setMatrix(noseSmallULRot2); 

      var noseSmallDRRot1 = multiplyHelper(noseRot1,gettransMatrix(0,-1.5,0.75));
      var test = multiplyHelper(noseSmallDRRot1, rotateU);
      var noseSmallDRRot2 = multiplyHelper(test, noseSmallscalMatrix);
      noseSmallDR.setMatrix(noseSmallDRRot2); 

      var noseSmallDLRot1 = multiplyHelper(noseRot1,gettransMatrix(-0.5,-1.5,0.75));
      var test = multiplyHelper(noseSmallDLRot1, rotateU);
      var noseSmallDLRot2 = multiplyHelper(test, noseSmallscalMatrix);
      noseSmallDL.setMatrix(noseSmallDLRot2); 

      for(var index = 1; index <= bigtentl.length; index++){
        var tentlRot1 = multiplyHelper(noseRot1,gettransMatrix(3,1.2-0.25*index,0.8));
        var tmp=multiplyHelper(tentlRot1,gettransMatrix(-2,-1.2+0.25*index,-0.8));
        var tmp1=multiplyHelper(tmp,rotateL);
        var tmp2= multiplyHelper(tmp1,gettransMatrix(2,1.2-0.25*index,0.8));
        var tentlRot2 = multiplyHelper(tmp2, scaltentMatrix);
        bigtentl[index-1].setMatrix(tentlRot2);
      }


      for(var index = 1; index <= bigtentr.length; index++){
        var tentrRot1 = multiplyHelper(noseRot1,gettransMatrix(-3,1.2-0.25*index,0.8));
        var tmp=multiplyHelper(tentrRot1,gettransMatrix(2,-1.2+0.25*index,-0.8));
        var tmp1=multiplyHelper(tmp,rotateR);
        var tmp2= multiplyHelper(tmp1,gettransMatrix(-2,1.2-0.25*index,0.8));
        var tentrRot2 = multiplyHelper(tmp2, scaltentMatrix);
        bigtentr[index-1].setMatrix(tentrRot2);
      }

      break;

    default:
      break;
  }
}

function getRotMatrix(p, str){
  switch(str)
  {case "x":
  var obj = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p),-Math.sin(-p), 0, 
                                            0, Math.sin(-p), Math.cos(-p), 0,
                                            0,        0,         0,        1);
  return obj;
  break;

  case "y":
  var obj = new THREE.Matrix4().set(Math.cos(-p),        0,         -Math.sin(-p),         0, 
                                            0,        1,        0,                      0, 
                                Math.sin(-p),         0,         Math.cos(-p),          0,
                                            0,        0,         0,                     1);
  return obj;
  break;

  case "z":
  var obj = new THREE.Matrix4().set(Math.cos(-p),       -Math.sin(-p),         0,        0, 
                                 Math.sin(-p),       Math.cos(-p),          0,        0, 
                                            0,                    0,        1,        0,
                                            0,                    0,        0,        1);
  return obj;
  break;

  default:
  break;

  }

}

function getscaleMatrix(x,y,z){
  var obj = new THREE.Matrix4().set(x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1);
  return obj;
}

function gettransMatrix(x,y,z){
  var obj = new THREE.Matrix4().set(1,0,0,x, 0,1,0,y, 0,0,1,z, 0,0,0,1);
  return obj;
}

function multiplyHelper(m1,m2){
  var obj = new THREE.Matrix4().multiplyMatrices(m1,m2);
  return obj;
}

function getRotToe(x,y,z,m1,r1,m2){
      var r01 =  multiplyHelper(r1, gettransMatrix(x,y,z-0.5));
      var rot1 = multiplyHelper(r01, m1);
      var rot_1 = multiplyHelper(rot1, gettransMatrix(x,y,0.5));
      var toe1Rot = multiplyHelper(rot_1, m2);
      return toe1Rot;
}


// LISTEN TO KEYBOARD
// Hint: Pay careful attention to how the keys already specified work!
var keyboard = new THREEx.KeyboardState();
var grid_state = false;
var key;
keyboard.domElement.addEventListener('keydown',function(event){
  if (event.repeat)
    return;
  if(keyboard.eventMatches(event,"Z")){  // Z: Reveal/Hide helper grid
    grid_state = !grid_state;
    grid_state? scene.add(grid) : scene.remove(grid);}   
  else if(keyboard.eventMatches(event,"0")){    // 0: Set camera to neutral position, view reset
    camera.position.set(45,0,0);
    camera.lookAt(scene.position);}

  else if(keyboard.eventMatches(event,"P")){
    (key == "P")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/9,1), key = "P")
  }
  else if(keyboard.eventMatches(event,"U")){ 
    (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "U")}  

      else if(keyboard.eventMatches(event,"I")){ 
    (key == "I")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/9,1), key = "I")}  

      else if(keyboard.eventMatches(event,"E")){ 
    (key == "E")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/12,1), key = "E")}  

      else if(keyboard.eventMatches(event,"N")){ 
    (key == "N")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/12,1), key = "N")}  

      else if(keyboard.eventMatches(event,"H")){ 
    (key == "H")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/9,1), key = "H")}  
 
    else if(keyboard.eventMatches(event,"G")){ 
      (key == "G")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/9,1), key = "G")}  

      else if(keyboard.eventMatches(event,"T")){ 
      (key == "T")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/9,1), key = "T")}
                else if(keyboard.eventMatches(event,"V")){ 
      (key == "V")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/9,1), key = "V")} 

      else if(keyboard.eventMatches(event,"D")){ 
      (key == "D")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/9,1), key = "D")}  

      else if(keyboard.eventMatches(event,"S")){ 
        counter++;
      ((key == "S") && (counter !== 1) )? (((key == "S") && (counter === 2) )?init_animation(p1,-p1,time_length):(init_animation(p1,0,time_length),counter = 0)) : (init_animation(0,Math.PI/4,1), key = "S")
    }  


  // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
  // Note: Remember spacebar sets jumpcut/animate! 
  // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.



    });

// SETUP UPDATE CALL-BACK
// Hint: It is useful to understand what is being updated here, the effect, and why.
function update() {
  updateBody();

  requestAnimationFrame(update);
  renderer.render(scene,camera);
}

update();