uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec2 uOffset;

varying vec2 vUv;

// 5-sample chromatic aberration — separates R/G/B channels dramatically
vec3 dramaticRGBShift(sampler2D tex, vec2 uv, vec2 offset) {
    // Red channel: strong positive offset, double-sampled
    float r  = texture2D(tex, uv + offset * 4.0).r * 0.65;
    r       += texture2D(tex, uv + offset * 2.0).r * 0.35;

    // Green: center (no shift)
    float g = texture2D(tex, uv).g;

    // Blue: strong negative offset, double-sampled
    float b  = texture2D(tex, uv - offset * 3.5).b * 0.6;
    b       += texture2D(tex, uv - offset * 6.0).b * 0.4;

    return vec3(r, g, b);
}

// Vignette — darkens edges for cinematic depth
float vignette(vec2 uv) {
    vec2 c = uv - 0.5;
    return 1.0 - smoothstep(0.18, 0.85, dot(c, c) * 3.2);
}

// Edge glow — electric cyan fringe along image silhouette on mouse move
vec3 edgeGlow(vec2 uv, vec2 offset) {
    float strength = length(offset) * 18.0;
    float edgeX = 1.0 - abs(uv.x - 0.5) * 2.0;
    float edgeY = 1.0 - abs(uv.y - 0.5) * 2.0;
    float edge  = 1.0 - smoothstep(0.65, 1.0, min(edgeX, edgeY));
    // Cyan tint: RGB (0, 0.96, 1.0)
    return vec3(0.0, edge * strength * 0.96, edge * strength);
}

void main() {
    vec3 color = dramaticRGBShift(uTexture, vUv, uOffset);

    // Layered cyan edge glow on mouse movement
    color += edgeGlow(vUv, uOffset);

    // Vignette applied last
    color *= vignette(vUv);

    gl_FragColor = vec4(color, uAlpha);
}
