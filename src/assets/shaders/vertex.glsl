uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uTime;

varying vec2 vUv;

float M_PI = 3.14159265;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    float offsetStrength = length(offset);

    // Primary mouse-driven sinusoidal warp (3x stronger than before)
    position.x += sin(uv.y * M_PI) * offset.x * 3.5;
    position.y += sin(uv.x * M_PI) * offset.y * 3.5;

    // Interference wave — two opposing frequencies
    float wave1 = sin(uv.x * M_PI * 3.0 + uTime * 2.0) * 0.04;
    float wave2 = sin(uv.y * M_PI * 5.0 - uTime * 1.5) * 0.025;
    position.z += (wave1 + wave2) * 100.0;

    // Radial ripple from UV center, mouse-triggered
    vec2 centered = uv - 0.5;
    float dist = length(centered);
    float ripple = sin(dist * 25.0 - uTime * 6.0) * offsetStrength * 8.0;
    position.z += ripple * (1.0 - smoothstep(0.0, 0.8, dist));

    // Twist — rotates geometry proportional to mouse speed
    float twist = offsetStrength * 14.0;
    float angle = twist * dist;
    float cosA = cos(angle);
    float sinA = sin(angle);
    vec2 rotated = vec2(
        cosA * centered.x - sinA * centered.y,
        sinA * centered.x + cosA * centered.y
    );
    position.x += (rotated.x - centered.x) * 90.0;
    position.y += (rotated.y - centered.y) * 90.0;

    return position;
}

void main() {
    vUv = uv;
    vec3 newPosition = deformationCurve(position, uv, uOffset);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0) * 0.9;
}
