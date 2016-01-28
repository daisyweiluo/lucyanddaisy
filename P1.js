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
renderer.setClearColor(0xFFFFFF); // white background colour
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

//45 rotated is the torso
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
var legMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);

// var transMatrix = gettransMatrix(0,0,9);
// var rotMatrix = getRotMatrix(dg,"x");
// var transtorsoMatrix = multiplyHelper(torsoMatrix, transMatrix);
// var RotatedtorsoMatrix = multiplyHelper(transtorsoMatrix, rotMatrix);
//var transRotatedtorsoMatrix = multiplyHelper(RotatedtorsoMatrix, transMatrix);

//LEGS THIGHS
var LlegtransMatrix = gettransMatrix(3.2,-1.5,1);
var RlegtransMatrix = gettransMatrix(-3.2,-1.5,1);
var legscalMatrix = getscaleMatrix(0.3,0.5,0.5);

var LlegMatrix = multiplyHelper(LlegtransMatrix,legscalMatrix);
var RlegMatrix = multiplyHelper(RlegtransMatrix,legscalMatrix);

//SMALL LEGS
var LsmllegtransMatrix = gettransMatrix(3,-3,1);
var RsmllegtransMatrix = gettransMatrix(-3,-3,1);
var smllegscalMatrix = getscaleMatrix(0.2,0.3,0.3);

var LsmllegMatrix = multiplyHelper(LsmllegtransMatrix,smllegscalMatrix);
var RsmllegMatrix = multiplyHelper(RsmllegtransMatrix,smllegscalMatrix);

//LOWER SMALL LEGS
 var LlowerlegtransMatrix = gettransMatrix(3,-3.7,1);
 var RlowerlegtransMatrix = gettransMatrix(-3,-3.7,1);
 var lowerlegscalMatrix = getscaleMatrix(0.1,0.4,0.1);

 var LlowerlegMatrix = multiplyHelper(LlowerlegtransMatrix,lowerlegscalMatrix);
 var RlowerlegMatrix = multiplyHelper(RlowerlegtransMatrix,lowerlegscalMatrix);


//HEAD TO TORSO 
// var head2torsoscalMatrix = getscaleMatrix(1,Math.sqrt(2),1.3);
// var head2torsotransMatrix = gettransMatrix(0,0,3.2);
// var head2torsoMatrix = multiplyHelper(head2torsotransMatrix,head2torsoscalMatrix);

//PALM
var LpalmtransMtx = gettransMatrix(3,-4.5,2);
var RpalmtransMtx = gettransMatrix(-3,-4.5,2);
var palmscalMtx = getscaleMatrix(0.15,0.1,0.5);
var LpalmMtx = multiplyHelper(LpalmtransMtx,palmscalMtx);
var RpalmMtx = multiplyHelper(RpalmtransMtx,palmscalMtx);

//FRONT THIGHS
var frontLtransMatrix = gettransMatrix(3.5,-2,10);
var frontRtransMatrix = gettransMatrix(-3.5,-2,10);
var frontscalMatrix = getscaleMatrix(0.3,0.5,0.5);

var frontLMatrix = multiplyHelper(frontLtransMatrix,frontscalMatrix);
var frontRMatrix = multiplyHelper(frontRtransMatrix,frontscalMatrix);

//FRONT KNEE
var frontLLtransMatrix = gettransMatrix(3.5,-3,10);
var frontRLtransMatrix = gettransMatrix(-3.5,-3,10);
var frontLscalMatrix = getscaleMatrix(0.2,0.3,0.2);

var frontLLMatrix = multiplyHelper(frontLLtransMatrix,frontLscalMatrix);
var frontRLMatrix = multiplyHelper(frontRLtransMatrix,frontLscalMatrix);

var nosetransMatrix = gettransMatrix(0,0,18);
var nosescalMatrix =  getscaleMatrix(0.2,0.2,0.4);
var noseMatrix=multiplyHelper(nosetransMatrix,nosescalMatrix);

//SMALL NOSE TENTACLES
var noseSmallscalMatrix=getscaleMatrix(0.05,0.2,0.05);
var noseSmallURtransMatrix = gettransMatrix(0,1.5,18.5);
var noseSmallULtransMatrix = gettransMatrix(-0.5,1.5,18.5);
var noseSmallDRtransMatrix = gettransMatrix(0,-1.5,18.5);
var noseSmallDLtransMatrix = gettransMatrix(-0.5,-1.5,18.5);
var noseSmallURMatrix=multiplyHelper(noseSmallURtransMatrix,noseSmallscalMatrix);
var noseSmallULMatrix=multiplyHelper(noseSmallULtransMatrix,noseSmallscalMatrix);
var noseSmallDRMatrix=multiplyHelper(noseSmallDRtransMatrix,noseSmallscalMatrix);
var noseSmallDLMatrix=multiplyHelper(noseSmallDLtransMatrix,noseSmallscalMatrix);

// BIG NOSE TENTACLES
// var rotateBig = new THREE.Matrix4().set(1,        0,         0,        0, 
//                                         0, Math.cos(-20),-Math.sin(-20), 0, 
//                                         0, Math.sin(-20), Math.cos(-20), 0,
//                                         0,        0,         0,        1);
// var noseBigscalMatrix=getscaleMatrix(0.05,0.5,0.05);
// var noseBigURtransMatrix = gettransMatrix(0,3,18.5);
// var rotateBig = new THREE.Matrix4().set(Math.cos(40), -Math.sin(40), 0, 0, 
//                                         Math.sin(40), Math.cos(40), 0, 0, 
//                                         0, 0,1, 0,
//                                         0, 0, 0, 1);
// var noseBiginterMatrix=multiplyHelper(rotateBig,noseBigURtransMatrix);
// var noseBigMatrix=multiplyHelper(noseBiginterMatrix,noseBigscalMatrix);


// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
// Hint: Play around with the headTorsoMatrix values, what changes in the render? Why?         


// CREATE BODY
//var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
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

//Nose
var nose=new THREE.Mesh(torsoGeometry,normalMaterial);

// Nose Tentacles SMALL
var noseSmallUR=new THREE.Mesh(torsoGeometry,normalMaterial);
var noseSmallUL=new THREE.Mesh(torsoGeometry,normalMaterial);
var noseSmallDR=new THREE.Mesh(torsoGeometry,normalMaterial);
var noseSmallDL=new THREE.Mesh(torsoGeometry,normalMaterial);


//HEAD TO TORSO
// var head2torso = new THREE.Mesh(torsoGeometry,normalMaterial);


//torso.setMatrix(RotatedtorsoMatrix);
Lleg.setMatrix(LlegMatrix);
Rleg.setMatrix(RlegMatrix);
// head2torso.setMatrix(head2torsoMatrix);
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

nose.setMatrix(noseMatrix);
noseSmallUR.setMatrix(noseSmallURMatrix);
noseSmallUL.setMatrix(noseSmallULMatrix);
noseSmallDR.setMatrix(noseSmallDRMatrix);
noseSmallDL.setMatrix(noseSmallDLMatrix);

//scene.add(torso);
scene.add(Lleg);
scene.add(Rleg);
//scene.add(head2torso);
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
scene.add(nose);
scene.add(noseSmallUR);
scene.add(noseSmallUL);
scene.add(noseSmallDR);
scene.add(noseSmallDL);
// //HEAD LOOP
// var hcount = 1; 
// var hpos = 5;
// var ScalHeadMatrixs =[];
// var TransHeadMatrixs = [];
// var heads = [];

// while (hcount <= 20){
//   var h = 1*(1-0.05*hcount);
//   var scalheadMatrix = new THREE.Matrix4().set(h,0,0,0, 
//                                                 0,h,0,0, 
//                                                 0,0,h,0, 
//                                                 0,0,0,1);
//   ScalHeadMatrixs.push(scalheadMatrix);
//   hpos+=h*(1-0.1);
//   var transheadMatrix = gettransMatrix(0,0,hpos);
//   TransHeadMatrixs.push(transheadMatrix);

//   var LoopHeadMatrix = multiplyHelper(transheadMatrix,scalheadMatrix);
//   var LoopHead = new THREE.Mesh(torsoGeometry,normalMaterial);
//   heads.push(LoopHead);
//   LoopHead.setMatrix(LoopHeadMatrix);
//   scene.add(LoopHead);
//   hcount++;
// }

//BODY LOOP
var bcount = 1;
var origin = 4;
var ScalBodyMatrixs = [];
var TransBodyMatrixs = [];
var body = [];

var forigin = 4;
var fScalBodyMatrixs = [];
var fTransBodyMatrixs = [];
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
  var transbodyMatrix = gettransMatrix(0,0,origin);
  TransBodyMatrixs.push(transbodyMatrix);
  var LoopBodyMatrix = multiplyHelper(transbodyMatrix,scalbodyMatrix);

  var LoopBody = new THREE.Mesh(torsoGeometry,normalMaterial);
  body.push(LoopBody);
  LoopBody.setMatrix(LoopBodyMatrix);
  scene.add(LoopBody);

  //front body
  var a = 1.4*(1-0.01*bcount);
  var b = 1.4*(1-0.01*bcount);
  var c = 1.4*(1-0.01*bcount);
  var fscalbodyMatrix = new THREE.Matrix4().set(a,0,0,0, 
                                                0,b,0,0, 
                                                0,0,c,0, 
                                                0,0,0,1);
  fScalBodyMatrixs.push(fscalbodyMatrix);
  forigin+=a*(1-0.8);
  var ftransbodyMatrix = gettransMatrix(0,0,forigin);
  fTransBodyMatrixs.push(ftransbodyMatrix);
  var fLoopBodyMatrix = multiplyHelper(ftransbodyMatrix,fscalbodyMatrix);

  var fLoopBody = new THREE.Mesh(torsoGeometry,normalMaterial);
  fbody.push(fLoopBody);
  fLoopBody.setMatrix(fLoopBodyMatrix);
  scene.add(fLoopBody);

  bcount++;
}



//TAIL
var count = 1; 
var initialpos = 10;
var ScalTailMatrixs =[];
var TransTailMatrixs = [];
//All the tail Matrix is stored here
//var tailMatrixs = [];
//All the tail is stored here
var tails = [];
while (count <= 250){
  var n = 0.1*(1-0.01*count);
  var scalTailMatrix = new THREE.Matrix4().set(n,0,0,0, 
                                                0,n,0,0, 
                                                0,0,n,0, 
                                                0,0,0,1);
  ScalTailMatrixs.push(scalTailMatrix);
  initialpos+=n;
  var transTailMatrix = gettransMatrix(0,-0.5,-initialpos);
  TransTailMatrixs.push(transTailMatrix);

  var LoopTailMatrix = multiplyHelper(transTailMatrix,scalTailMatrix);
  //tailMatrixs.push(LoopTailMatrix);

  var LoopTail = new THREE.Mesh(torsoGeometry,normalMaterial);
  tails.push(LoopTail);
  LoopTail.setMatrix(LoopTailMatrix);
  scene.add(LoopTail);
  count++;
}

// Make tentacles
var tcount = 1; 
var RotatetentMatrixs = [];
var bigtentMatrix = [];
var bigtent = [];
var scaltentMatrix = getscaleMatrix(0.05,0.5,0.05);
var noseBigtransMatrix = gettransMatrix(0,3,18.5);

while (tcount <= 18){
var rotateBig = new THREE.Matrix4().set(Math.cos(1.1*tcount), -Math.sin(1.1*tcount), 0, 0, 
                                        Math.sin(1.1*tcount), Math.cos(1.1*tcount), 0, 0, 
                                        0, 0,1, 0,
                                        0, 0, 0, 1);
var noseBiginterMatrix=multiplyHelper(rotateBig,noseBigtransMatrix);
var noseBigMatrix=multiplyHelper(noseBiginterMatrix,scaltentMatrix);
bigtentMatrix.push(noseBigMatrix);

var noseBigtent = new THREE.Mesh(torsoGeometry,normalMaterial);
noseBigtent.setMatrix(noseBigMatrix);
bigtent.push(noseBigtent);

scene.add(noseBigtent);
tcount++;
}

//FRONT THIGH LOOP
// var flegcount = 1; 
// var fpos = -2;
// var ScalFLegMatrixs = [];
// var TransFLegMatrixs = [];

// var flegs = [];
// while (flegcount <= 20){
//   var f = 0.1*(1-0.01*flegcount);
//   var scalflegMatrix = new THREE.Matrix4().set(f,0,0,0, 
//                                                 0,f,0,0, 
//                                                 0,0,f,0,
//                                                 0,0,0,1);
//   ScalFLegMatrixs.push(scalflegMatrix);
//   fpos-=f*(1-0.8);
//   var transflegMatrix = gettransMatrix(3.5,fpos,10);
//   TransFLegMatrixs.push(transflegMatrix);

//   var LoopFLegMatrix = multiplyHelper(transflegMatrix,scalflegMatrix);
//   //tailMatrixs.push(LoopTailMatrix);

//   var LoopFLeg = new THREE.Mesh(torsoGeometry,normalMaterial);
//   flegs.push(LoopFLeg);
//   LoopFleg.setMatrix(LoopFLegMatrix);
//   scene.add(LoopFLeg);
//   flegcount++;
// }



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
  p0 = p_start;
  p1 = p_end;
  time_length = t_length;
  time_start = clock.getElapsedTime();
  time_end = time_start + time_length;
  animate = true; // flag for animation
  return;
}

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

      for(var index = 0; index < bigtent.length; index++){
        var BigtentRotMatrix = multiplyHelper(torsoRotMatrix,bigtentMatrix[index]);
        bigtent[index].setMatrix(BigtentRotMatrix);
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


      // var head2torsoRotMatrix = multiplyHelper(torsoRotMatrix,head2torsoMatrix);

      // torso.setMatrix(RotatedtorsoRotMatrix); 
      // head2torso.setMatrix(head2torsoRotMatrix);
      break;


      // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
      // Note: Remember spacebar sets jumpcut/animate   


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
  else if(keyboard.eventMatches(event,"U")){ 
    (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "U")}  


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