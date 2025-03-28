#version 300 es
precision mediump float;

#define TWO_PI 6.28318530718

/**
* \file
* \author Gyuwon Na
* \date 2025 Spring
* \par CS250 Computer Graphics II
* \copyright DigiPen Institute of Technology
*/

out vec4 FragColor;

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb(in vec3 c){
    vec3 rgb=clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),
6.)-3.)-1.,
0.,
1.);
rgb=rgb*rgb*(6.-2.*rgb);
return c.z*mix(vec3(.8431,.8431,.8431),rgb,c.y);
}

void main(){
vec2 st=gl_FragCoord.xy/u_resolution;
vec3 color=vec3(1.,1.,1.);

// Use polar coordinates instead of cartesian
vec2 toCenter=abs(vec2(.5)-st);
float angle=acos((toCenter.y+toCenter.x)/2.)+u_time/2.;
float radius=length(toCenter-.25);

// Map the angle (-PI to PI) to the Hue (from 0 to 1)
// and the Saturation to the radius
color=hsb2rgb(vec3((angle*.75),radius,1.));

FragColor=vec4(color,1.);
}
