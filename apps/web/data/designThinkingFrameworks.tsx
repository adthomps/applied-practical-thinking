import type { ReactNode } from "react";
import {
  AlertTriangle,
  GitBranch,
  Layers,
  Repeat,
  Scale,
  Target,
} from "lucide-react";

export type DesignThinkingFramework = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  when: string;
  whyItMatters: string;
  steps: string[];
  prompts: string[];
  artifacts: string[];
  antiPattern: string;
  icon: ReactNode;
};

export const designThinkingFrameworks: DesignThinkingFramework[] = [
  {
    slug: "problem-framing",
    title: "Problem Framing",
    shortTitle: "Problem Framing",
    description: "Define the problem before jumping to solutions.",
    when: "Starting any new project or when solutions are not working.",
    whyItMatters:
      "APT starts by making the problem explicit and observable. A well-framed problem gives every later decision a clearer boundary and purpose.",
    steps: [
      "State the observable symptom.",
      "Identify who experiences it.",
      "Quantify the impact.",
      "Ask why multiple times until the pattern becomes visible.",
      "Reframe the issue as an opportunity or system failure to address.",
    ],
    prompts: [
      "What is happening that should not be happening?",
      "Who feels the consequence first?",
      "What would improve if this were resolved well?",
    ],
    artifacts: [
      "Problem statement with observable symptom and impact",
      "Root-cause chain or 5 Whys summary",
      "Reframed opportunity statement",
    ],
    antiPattern: "Jumping to a favored solution before the problem is clear enough to challenge.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    slug: "assumption-mapping",
    title: "Assumption Mapping",
    shortTitle: "Assumption Mapping",
    description: "Surface and test the beliefs driving decisions.",
    when: "Before major investments or when uncertainty is shaping the plan.",
    whyItMatters:
      "Many failures come from treating assumptions like facts. This framework helps APT expose risk early and learn before overcommitting.",
    steps: [
      "List the assumptions embedded in the idea.",
      "Rate them by certainty and consequence.",
      "Identify the assumptions that could invalidate the direction.",
      "Design the smallest useful validation test.",
      "Update the decision based on evidence.",
    ],
    prompts: [
      "What are we acting as if we already know?",
      "Which assumption would make this direction collapse if false?",
      "What is the cheapest way to test that belief?",
    ],
    artifacts: [
      "Assumption inventory ranked by certainty and consequence",
      "Validation plan for the highest-risk beliefs",
      "Decision update based on evidence gathered",
    ],
    antiPattern: "Treating stakeholder confidence as evidence and skipping the cheap validation step.",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    slug: "constraint-analysis",
    title: "Constraint Analysis",
    shortTitle: "Constraint Analysis",
    description: "Use limitations as creative forcing functions.",
    when: "When the solution space feels too large, vague, or unrealistic.",
    whyItMatters:
      "Constraints are not a nuisance in APT. They are the shape of the real solution space and often the clearest route to better tradeoffs.",
    steps: [
      "List hard constraints that cannot move.",
      "List soft constraints that are preferences or defaults.",
      "Identify hidden or inherited constraints.",
      "Rank constraints by how strongly they shape the solution.",
      "Design within those boundaries rather than around them.",
    ],
    prompts: [
      "What truly cannot change here?",
      "What are we treating as fixed that may only be habitual?",
      "Which constraint creates the most useful focus?",
    ],
    artifacts: [
      "Hard vs soft constraint list",
      "Ranked constraint map showing solution pressure",
      "Reduced solution-space summary",
    ],
    antiPattern: "Fighting every limitation instead of using constraints to clarify the solution space.",
    icon: <Scale className="h-5 w-5" />,
  },
  {
    slug: "decision-trees",
    title: "Decision Trees",
    shortTitle: "Decision Trees",
    description: "Map decision points and their consequences.",
    when: "Facing irreversible decisions or multiple plausible paths.",
    whyItMatters:
      "APT values visible reasoning. Decision trees help make second-order effects, reversibility, and tradeoffs easier to inspect before commitment.",
    steps: [
      "Identify the core decision to be made.",
      "Lay out the realistic options.",
      "Map the downstream consequences of each branch.",
      "Estimate probabilities, cost, or reversibility.",
      "Choose the branch with the strongest overall expected value.",
    ],
    prompts: [
      "What changes if we pick this path?",
      "Which branch creates optionality and which one closes it down?",
      "What is the second-order cost of being wrong here?",
    ],
    artifacts: [
      "Decision map with viable branches",
      "Tradeoff summary including reversibility and downside",
      "Chosen path with explicit rationale",
    ],
    antiPattern: "Comparing options only on short-term upside while ignoring reversibility and second-order cost.",
    icon: <GitBranch className="h-5 w-5" />,
  },
  {
    slug: "iteration-cycles",
    title: "Iteration Cycles",
    shortTitle: "Iteration Cycles",
    description: "Build learning into the development process.",
    when: "Building anything new or improving an existing system.",
    whyItMatters:
      "APT treats iteration as deliberate learning, not movement for its own sake. Each cycle should test something specific and leave the system more legible.",
    steps: [
      "Define the hypothesis.",
      "Build the smallest viable version that can test it.",
      "Measure against explicit criteria.",
      "Capture what was learned.",
      "Decide whether to pivot, persevere, or pause.",
    ],
    prompts: [
      "What exactly are we trying to learn in this cycle?",
      "What would count as success or failure?",
      "What changes because of what we learned?",
    ],
    artifacts: [
      "Iteration hypothesis",
      "Success criteria and measures",
      "Pivot, persevere, or pause decision log",
    ],
    antiPattern: "Calling motion iteration without defining what the cycle is supposed to teach.",
    icon: <Repeat className="h-5 w-5" />,
  },
  {
    slug: "systems-mapping",
    title: "Systems Mapping",
    shortTitle: "Systems Mapping",
    description: "Understand the relationships between components.",
    when: "Working on complex, interconnected problems with feedback effects.",
    whyItMatters:
      "APT is built on systems thinking. Mapping relationships, boundaries, and leverage points helps avoid shallow fixes that break somewhere else.",
    steps: [
      "Identify the system boundary.",
      "Map inputs, outputs, and actors.",
      "Trace feedback loops and dependencies.",
      "Find leverage points where change matters most.",
      "Model interventions before implementing them.",
    ],
    prompts: [
      "What is inside this system and what is outside it?",
      "Where does change propagate or loop back?",
      "Which intervention changes the system rather than just one symptom?",
    ],
    artifacts: [
      "System boundary definition",
      "Relationship or feedback-loop map",
      "Leverage-point shortlist",
    ],
    antiPattern: "Fixing one visible symptom in isolation and causing a different failure elsewhere in the system.",
    icon: <Layers className="h-5 w-5" />,
  },
];

export function getDesignThinkingFramework(slug: string) {
  return designThinkingFrameworks.find((framework) => framework.slug === slug);
}
