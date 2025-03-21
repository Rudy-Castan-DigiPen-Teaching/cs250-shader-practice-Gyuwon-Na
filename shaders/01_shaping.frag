#version 300 es
precision mediump float;

#define PI 3.14159265359

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

float plot(vec2 st,float pct)
{
    return smoothstep(pct-.02,pct,st.y)-smoothstep(pct,pct+.02,st.y);
}

float parabola( float x, float k ){
    return pow( 4.0*x*(1.0-x), k );
}

void main()
{
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    float y=sin((st.x*st.y)+u_time) -0.1;
    float y2=cos((st.x-st.y) * 0.5 /0.0012);
    
    vec3 color=vec3(0.549, 1.0, 0.0);
    
    float pct=plot(st,y);
    color=(1.-pct)*color+pct*vec3(1.0, 1.0, 1.0);
    
    float pct2=cos(PI / 2. * u_time);
    color=(1.-pct2)*color+pct2*vec3(0.001,0.002,0.003);
    
    FragColor=vec4(color,1.);
}