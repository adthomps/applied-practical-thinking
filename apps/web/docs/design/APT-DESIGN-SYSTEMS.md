# APT Systems Reference Models

Inside APT, Systems are the stable reference layer. They capture reusable models, patterns, and decision structures that persist after exploratory work has been clarified.

---

## Purpose

The Systems area exists to preserve coherent reference models, not to archive every project or experiment. A system belongs here when it has enough repeatable structure to be reused, taught, or inspected as a durable pattern.

---

## What Belongs Here

Use Systems for:

- operating models with stable boundaries
- reusable implementation patterns
- architectural references with documented decisions and tradeoffs
- models that connect back to experiments and learning material

Do not use Systems for:

- early concepts
- one-off mocks
- incomplete artifacts that have not converged into a stable model

---

## When To Capture A System

Capture a system when:

1. experiments have converged into a stable model
2. the underlying pattern can travel beyond one project
3. the decisions and tradeoffs are worth preserving for future reference
4. the model can be taught without needing the full history of the experiment that produced it

---

## What A Good System Contains

- a clear purpose and scope
- key decisions that shape the model
- tradeoffs that explain what it optimizes for
- concepts, platforms, or technologies where relevant
- links to related experiments and learning content

---

## Reference Types

Typical system/reference-model categories include:

- **Operating Model**
- **Pattern Library**
- **Reference Model**
- **Tooling Reference**

These labels help explain what kind of reusable structure a system is documenting.

---

## Failure Modes

- **Archive Everything**: every finished artifact is treated like a system
- **Pattern Without Context**: the model does not explain the problem it solves or the cost it introduces
- **Reference Drift**: the public reference no longer matches the actual code, design, or deployment reality

---

## Relationship To Other Areas

- **Learn** explains and teaches the ideas
- **Experiments** makes proof and exploration visible
- **Design** defines the doctrine and standards
- **Systems** preserves the stable models that remain after exploration

---

## Related Documents

- [APT Design Overview](./APT-DESIGN-OVERVIEW.md)
- [APT Design Architecture](./APT-DESIGN-ARCHITECTURE.md)
- System detail documents live under `apps/web/content/systems/`
