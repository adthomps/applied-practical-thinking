---
name: game-engine-selection
description: Select a game stack from project evidence instead of popularity.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: APT game-development enhancement
title: "Game Engine Selection"
domain: "game-development"
source_paths: ["apt-principles-agents/skills/game-development/game-engine-selection/SKILL.md"]
---

# Game Engine Selection

## Purpose

Choose a beginner-appropriate engine or web stack without treating one tool as universally best.

## When to Use

Use before a prototype or when the deployment target, learning goal, or current tool is mismatched.

## Inputs

2D/3D needs, web/desktop/mobile target, coding comfort, assets, prototype deadline, deployment, collaboration, maintenance, budget, and official platform constraints.

## Process

1. Weight the decision criteria with the project owner.
2. Shortlist Godot, Unity, Phaser, Three.js, React/Canvas, or a simpler web prototype.
3. Verify material claims in current official documentation.
4. Build the same tiny interaction in at most two finalists when uncertainty is high.
5. Compare setup, iteration, export, debugging, asset workflow, and maintainability.
6. Record decision, evidence, risks, revisit trigger, rollout, and rollback.

## Beginner Stack Comparison

Verified against the linked official documentation on 2026-06-27. “Prototype speed” assumes a tiny project and relevant prior coding experience; prove uncertain choices with the same small interaction in two finalists.

| Stack | 2D versus 3D | Primary targets | Coding comfort and learning curve | Asset workflow | Prototype speed | Deployment | Maintenance burden | Best-use conditions |
|---|---|---|---|---|---|---|---|---|
| Godot | Dedicated 2D and 3D engine features | Desktop, mobile, and web exports; verify the exact target/version | Editor-led workflow; GDScript is the common beginner path, with other language options documented | Built-in importing and scene/resource workflow | Fast when scenes, nodes, and editor-driven iteration fit the learner | Engine export workflow with target-specific requirements | Engine-version, scene/resource, and export compatibility must be owned | Small editor-led 2D or 3D games where an integrated engine reduces custom plumbing |
| Unity | Supports both 2D and 3D projects | Broad platform build support; verify current platform modules and terms | C# and a feature-rich editor create more initial surface area | Mature editor/import/package workflow; asset scope still needs control | Moderate for a beginner; faster when the learner already knows C# or Unity | Build profiles and platform-specific tooling | Editor, package, service, and version choices add ongoing ownership | Projects that benefit from C#, broad target options, or an established Unity workflow |
| Phaser | Purpose-built 2D framework; no built-in 3D renderer or physics | Web browsers first; native packaging depends on third-party tools | JavaScript or TypeScript; approachable for web developers | Web asset loading and framework scenes/game objects | Fast for small browser-first 2D loops | Static web delivery is direct; non-web targets add packaging choices | The project owns surrounding web tooling and any third-party native path | 2D browser games where web deployment and JS/TS familiarity matter most |
| Three.js | 3D rendering library, not a complete game engine | Web 3D through browser graphics APIs | Requires JavaScript and comfort assembling a render loop and missing game systems | Strong 3D scene/material/model workflow; the project supplies gameplay architecture | Fast for a focused 3D interaction, slower when many game-engine systems are needed | Web delivery; capability and performance fallbacks require testing | The project owns input, collision/physics choices, state, saves, UI, and lifecycle integration | Custom 3D web experiences where direct rendering control is more important than built-in game systems |
| React/Canvas | Best for simple 2D or UI-heavy interactions; Canvas supplies drawing, React supplies interface composition | Web browsers | JavaScript/TypeScript and React familiarity help; the game loop remains project-owned | Standard web images, audio, fonts, and data | Fast for card, puzzle, simulation, clicker, or interface-heavy prototypes | Standard web build/static hosting | React/UI state must stay separate from frame-rate-sensitive simulation; custom game systems remain owned | UI-heavy games and educational simulations already living in a React product |
| Plain web prototype | DOM and/or Canvas suit simple 2D, text, and pointer interactions | Web browsers | Smallest tool surface, but requires basic HTML, CSS, and JavaScript | Direct web assets with minimal build assumptions | Fastest for a tiny interaction with few systems | Static hosting with browser/device testing | Lowest dependency burden but highest responsibility for structure as scope grows | Clickers, visual novels, card/puzzle proofs, and throwaway interaction experiments |

The matrix narrows a shortlist; it does not replace a target-device spike. Recheck official documentation before relying on export support, licensing, package compatibility, or platform services.

## Outputs

Weighted matrix, prototype evidence, recommendation, rejected alternatives, and revisit conditions.

## Quality Bar

The recommendation follows project constraints and includes no unsupported claim or default winner.

## References

- [Prototype-First Development](../../../principles/game-development/prototype-first-development.md)
- [Prototype Plan](../../../templates/game-development/prototype-plan.md)
- [Godot introduction and feature index](https://docs.godotengine.org/en/stable/about/introduction.html)
- [Unity 2D and 3D projects](https://docs.unity3d.com/Manual/2Dor3D.html)
- [Unity platform development](https://docs.unity3d.com/Manual/PlatformSpecific.html)
- [Phaser documentation](https://docs.phaser.io/)
- [Three.js fundamentals](https://threejs.org/manual/en/fundamentals.html)
- [React learning guide](https://react.dev/learn)
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
