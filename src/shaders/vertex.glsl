attribute vec3 newPosition;

uniform float u_Animation;

void main() {
    vec3 pos = position;

    pos = mix(position, newPosition, u_Animation);

    vec4 worldPos = modelMatrix * vec4(pos, 1.0); 
    vec4 viewPos = viewMatrix * worldPos; 
    vec4 projectionPos = projectionMatrix * viewPos; 
 
    gl_Position = projectionPos; 
    gl_PointSize = 2.5; 
}