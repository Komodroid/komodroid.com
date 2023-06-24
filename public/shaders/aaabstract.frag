#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_complexity;
uniform float u_saturation;
uniform float u_twist;
uniform float u_light;
uniform float u_mix;

void main() {
  vec2 coord = (gl_FragCoord.xy - (u_resolution / 2.)) / max(u_resolution.y, u_resolution.x);
  float len = length(vec2(coord.x, coord.y));

  coord.x -= cos(coord.y + sin(len * u_twist)) * sin(u_time / 10.0);
  coord.y -= sin(coord.x + cos(len * (u_twist / 2.))) * sin(u_time / 5.0);

  float space = cos(atan(sin(len * coord.x), sin(len * coord.y)) * 6.);
  space /= 6.;

  space = fract(space * u_complexity) / 2.2;
  vec3 color = vec3(space);

  color.r *= sin(len * (1.2 - u_mix)) * u_saturation;
  color.g *= sin(len * (3.3 - u_mix)) * u_saturation;
  color.b *= sin(len * (4.3 - u_mix)) * u_saturation;

  if (u_light == 1.0) {
    color.r = cos(len * color.r);
    color.g = cos(len * color.g);
    color.b = cos(len * color.b);
  } else {
    color.r = 1. - abs(cos(len * color.r));
    color.g = 1. - abs(cos(len * color.g));
    color.b = 1. - abs(cos(len * color.b));
  }

  gl_FragColor = vec4(color, 1.0);
}

