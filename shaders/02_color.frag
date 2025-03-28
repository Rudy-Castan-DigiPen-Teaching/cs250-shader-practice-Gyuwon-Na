/**
* \file
* \author Gyuwon Na
* \date 2025 Spring
* \par CS250 Computer Graphics II
* \copyright DigiPen Institute of Technology
*/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.0, 0.8353, 1.0);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-sin((u_time)), pct, st.y) -
          smoothstep( pct, pct+sin((u_time)), st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);

    color = mix(colorA.gbr, colorB.rbg, pct);

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0, 0.0, 0.0),plot(st,pct.r));
    color = mix(color,vec3(1.0, 0.9529, 0.2706),plot(st,pct.g));
    color = mix(color,vec3(1.0, 0.9373, 0.8039),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}
