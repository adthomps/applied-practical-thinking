export interface SystemDefinition {
  id: string;
  title: string;
  purpose: string;
  description: string;
  referenceType?: string;
  status?: string;
  appliesTo?: string[];
  decisions: string[];
  tradeoffs: string[];
  concepts: string[];
  platforms?: string[];
  technologies?: string[];
  links: {
    demo?: string;
    docs?: string;
    repo?: string;
  };
  productionGuide?: {
    overview?: string;
    deployment?: string;
    api?: string;
    operations?: string;
  };
  learningResources?: {
    rationale?: string;
    caseStudies?: string[];
    tutorials?: string[];
    glossary?: string[];
  };
}
