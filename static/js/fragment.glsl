uniform float time;
uniform sampler2D img;
varying vec2 vUv;

void main() {
    vec4 texture = texture2D(img, vUv);
    gl_FragColor = texture;
}