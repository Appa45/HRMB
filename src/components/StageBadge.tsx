import type { ContactStage } from "../types/contact";

const stageClass: Record<ContactStage, string> = {
  Lead: "stage-lead",
  Prospect: "stage-prospect",
  Qualified: "stage-qualified",
  Customer: "stage-customer",
};

export default function StageBadge({ stage }: { stage: ContactStage }) {
  return <span className={`stage-badge ${stageClass[stage]}`}><span className="stage-dot" />{stage}</span>;
}
