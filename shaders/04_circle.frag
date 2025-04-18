#version 300 es

precision mediump float;

/**
* \file
* \author Gyuwon Na
* \date 2025 Spring
* \par CS250 Computer Graphics II
* \copyright DigiPen Institute of Technology
*/

out vec4 FragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Convert pixel coords to normalized coords
vec2 to_coord(vec2 pixel_point)
{
    vec2 point=pixel_point/u_resolution;
    if(u_resolution.x>u_resolution.y)
    {
        // wide not tall
        // height is going to between 0-1
        // width is going to be expanded, larger than 0-1
        point.x*=u_resolution.x/u_resolution.y;
        // now to recenter the range
        point.x+=(u_resolution.y-u_resolution.x)/(u_resolution.x);
    }
    else
    {
        point.y*=u_resolution.y/u_resolution.x;
        point.y+=(u_resolution.x-u_resolution.y)/u_resolution.y;
    }
    
    return point;
}

float sCircle(vec2 point,vec2 center,float radius)
{
    float d=distance(point,center);
    return d-radius;
}

// return 0 not in circle, 1 in circle
float circle(vec2 point,vec2 center,float radius)
{
    float sd=sCircle(point,center,radius);
    // return 1.0 - step(0., sd);
    float E=fwidth(sd);
    return 1.-smoothstep(-E,E,sd);
}

void main(void)
{
    vec2 position=to_coord(gl_FragCoord.xy);
    vec3 color=vec3(.3451,.4941,.5843);
    
    vec2 p=vec2(cos(u_time),sin(u_time))*.25+vec2(.5);
    float t=circle(vec2(1.-position.x,1.-position.y),p,.05);
    
    color=mix(vec3(0.,1.-p.y,.8),vec3(p.x+.95,p.y*1.3-.05,0.),t);
    
    FragColor=vec4(color,1.);
    
    if((position.y)<.35)
    {
        FragColor=vec4(.3412,.2039,0.,1.);
    }
}