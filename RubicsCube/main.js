const NumCubes = 27;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.2, 0.2, 0.2, 1.0); // red

    gl.enable(gl.DEPTH_TEST);
    

    var aspect = canvas.clientWidth / canvas.clientHeight;
    var near = 1.0;
    var far = 10.0

    T = translate(0.0, 0.0, -0.5 * (near + far));
    
    cubes = [];
    xforms = [];

    for (var i = 0; i < NumCubes; ++i) {
        cubes.push(new Cube(gl));   // This'll make a cube object for you
        cubes[i].P = perspective(99.0, aspect, near, far);
    }

    for (x = -1; x <= 1; x++)
        for (y = -1; y <= 1; y++)
            for (z = -1; z <= 1; z++)
                xforms.push(translate(x, y, z));  // this will create a translation for each cube




    render();
}

angle = 0;

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // set each one of the cube MV to appo translation

    var ms = new MatrixStack;

    angle+=1;

    for (var i = 0; i < NumCubes; ++i) {
        ms.load(T);
        ms.rotate(angle, [1, 1, 0]);
        ms.mult(xforms[i]);
        //ms.rotate(30 * i, [1, 0, 0]);
        ms.scale(.99, .99, .99);

        cubes[i].MV = ms.current();
        cubes[i].render();
    }

    requestAnimationFrame(render);
}

window.onload = init;