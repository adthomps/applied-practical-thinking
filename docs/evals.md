# APT Design Assistant Evaluation Prompts

## Expected Behaviors
- Answers must be grounded in retrieved sources
- Citations required for every factual claim
- If confidence < threshold or no sources found:
  - Respond: "Not found in APT docs yet."
  - Suggest which doc section should be added

## Example Prompts

### Grounded Answer
**Prompt:**
> What is the primary color token in the APT Design System?

**Expected:**
- Answer from tokens/config docs
- Citations to source chunk
- Confidence > threshold

### Not Found
**Prompt:**
> What is the recommended accessibility testing tool for APT?

**Expected:**
- "Not found in APT docs yet."
- Suggest adding to docs/design/accessibility.md
- No hallucinated answer

### Multi-Source
**Prompt:**
> How does APT define design thinking?

**Expected:**
- Answer from docs/*thinking*
- Citations to relevant section
- Prefer higher-priority source if overlap

## Evaluation Checklist
- [ ] All answers cite sources
- [ ] No hallucinations
- [ ] Low confidence handled correctly
- [ ] Source priority rules followed
- [ ] UI shows correct state for not-found
