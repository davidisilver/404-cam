precision mediump float;

const float PI = 3.14159;
const float TAU = 6.28318;

varying vec2 vTexCoord;

uniform vec2 uResolution;
uniform float s;
uniform float n;
uniform float d;
uniform float quads;
uniform vec3 col0;
uniform vec3 col1;
uniform vec3 col2;
uniform vec3 col3;

vec2 reparameterize(vec2 uv) {
  vec2 nuv = uv;
  float ax = uResolution.x / uResolution.y;
  float ay = uResolution.y / uResolution.x;
  if ( ax > ay )
  {
    nuv.x *= ax;
  }
  if ( ay > ax )
  {
    nuv.y *= ay;
  }
  return nuv;
}


void main() {
  vec2 uv = vTexCoord;
  //uv = reparameterize(uv);
  
  if(quads == 1.0) {
    uv -= vec2(0.5,0);
    uv = abs(uv);
  } else if(quads == 2.0) {
    uv -= vec2(0.5,0.5);
  }
  
  vec3 col;
  vec2 pos = uv*uResolution;
  pos = floor(pos - mod(pos,vec2(d,d))) - vec2(1.0)*sign(pos);

  if(mod(mod(pos.x*pos.y, n + 1.), s) < 1.0 ) {
      col = col0;
  } else if(mod(mod(pos.x*pos.y, n + 2.), s) < 1.0 )   {
    col = col1;
  } else if(mod(mod(pos.x*pos.y, n + 3.), s) < 1.0 )   {
    col = col2;
  } else {
    col = col3;;
  }

  gl_FragColor = vec4(col,1.0);
}
