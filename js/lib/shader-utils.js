const canvasEl = document.querySelector('#shader');
const shaderName = canvasEl.dataset.name;
const sandbox = new GlslCanvas(canvasEl);
window.sandbox = sandbox;

let string_frag_code;
document.addEventListener('DOMContentLoaded', () => {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
  fetch(`/shaders/${shaderName}.frag`)
    .then((res) => res.text())
    .then((fragmentText) => {
      string_frag_code = fragmentText;
      sandbox.load(string_frag_code);
      setUniforms();
    });
});

//Resize canvas
window.addEventListener('resize', () => {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
});

function setUniform(name, value) {
  sandbox.setUniform(`u_${name}`, value);
}
window.setUniform = setUniform;

function setUniforms() {
  if (sandbox) {
    sandbox.setUniform('u_complexity', 10.0);
    sandbox.setUniform('u_saturation', 3.0);
    sandbox.setUniform('u_twist', 7.0);
    sandbox.setUniform('u_light', 0);
    sandbox.setUniform('u_mix', 1.0);
  }
}