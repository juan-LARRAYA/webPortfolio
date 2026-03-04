// Vertex shader
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var output: VertexOutput;

  // Full-screen quad
  var positions = array<vec2f, 6>(
    vec2f(-1.0, -1.0),
    vec2f(1.0, -1.0),
    vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0),
    vec2f(1.0, -1.0),
    vec2f(1.0, 1.0)
  );

  var uvs = array<vec2f, 6>(
    vec2f(0.0, 1.0),
    vec2f(1.0, 1.0),
    vec2f(0.0, 0.0),
    vec2f(0.0, 0.0),
    vec2f(1.0, 1.0),
    vec2f(1.0, 0.0)
  );

  output.position = vec4f(positions[vertexIndex], 0.0, 1.0);
  output.uv = uvs[vertexIndex];

  return output;
}

// Fragment shader - Chromatic aberration + glitch effect
struct Uniforms {
  time: f32,
  effectStrength: f32,
  blendMode: f32,
}

@group(0) @binding(0) var texture1: texture_2d<f32>;
@group(0) @binding(1) var texture2: texture_2d<f32>;
@group(0) @binding(2) var textureSampler: sampler;
@group(0) @binding(3) var<uniform> uniforms: Uniforms;

@fragment
fn fragmentMain(@location(0) uv: vec2f) -> @location(0) vec4f {
  let time = uniforms.time;
  let strength = uniforms.effectStrength;

  // Chromatic aberration offsets
  let offset = strength * 0.01;
  let aberrationR = vec2f(offset, 0.0);
  let aberrationG = vec2f(0.0, 0.0);
  let aberrationB = vec2f(-offset, 0.0);

  // Sample texture 1 with chromatic aberration
  let r1 = textureSample(texture1, textureSampler, uv + aberrationR).r;
  let g1 = textureSample(texture1, textureSampler, uv + aberrationG).g;
  let b1 = textureSample(texture1, textureSampler, uv + aberrationB).b;
  var color1 = vec4f(r1, g1, b1, 1.0);

  // Sample texture 2 with displacement
  let displacement = sin(uv.y * 20.0 + time) * strength * 0.02;
  let uvDisplaced = vec2f(uv.x + displacement, uv.y);
  var color2 = textureSample(texture2, textureSampler, uvDisplaced);

  // Blend modes
  var finalColor: vec4f;

  // 0 = screen, 1 = multiply, 2 = overlay, 3 = difference
  if (uniforms.blendMode < 0.5) {
    // Screen blend
    finalColor = vec4f(1.0) - (vec4f(1.0) - color1) * (vec4f(1.0) - color2);
  } else if (uniforms.blendMode < 1.5) {
    // Multiply blend
    finalColor = color1 * color2;
  } else if (uniforms.blendMode < 2.5) {
    // Overlay blend
    finalColor = mix(2.0 * color1 * color2, vec4f(1.0) - 2.0 * (vec4f(1.0) - color1) * (vec4f(1.0) - color2), step(0.5, color1));
  } else {
    // Difference blend
    finalColor = abs(color1 - color2);
  }

  // Add glitch effect
  let glitchLine = step(0.99, sin(uv.y * 100.0 + time * 10.0));
  finalColor = mix(finalColor, vec4f(1.0, 0.0, 1.0, 1.0), glitchLine * strength * 0.3);

  return finalColor;
}
