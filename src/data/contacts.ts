import type { Contact, ContactStage } from "../types/contact";

export const STAGES: ContactStage[] = ["Lead", "Prospect", "Qualified", "Customer"];

export const initialContacts: Contact[] = [
  { id: "c1", name: "Ava Mitchell", email: "ava@northstarlabs.com", company: "Northstar Labs", role: "Product Manager", owner: "Sarah Kim", labels: ["Inbound", "Event"], stage: "Lead", notes: "Interested in a product demo. Follow up next month.", avatarColor: "#e8c4b5" },
  { id: "c2", name: "Maya Chen", email: "maya@orbitworks.com", company: "Orbit Works", role: "Marketing Lead", owner: "Alex Rivera", labels: ["Networking"], stage: "Lead", notes: "Met at a networking event.", avatarColor: "#d9d4f5" },
  { id: "c3", name: "Ethan Brooks", email: "ethan@pineco.com", company: "Pine & Co.", role: "Sales Director", owner: "Sarah Kim", labels: ["Follow-up", "B2B"], stage: "Prospect", notes: "Follow up next week with product details.", avatarColor: "#c6d8d0" },
  { id: "c4", name: "Sofia Patel", email: "sofia@embersystems.com", company: "Ember Systems", role: "Founder", owner: "Taylor Morgan", labels: ["Pricing"], stage: "Prospect", notes: "Asked for pricing details and team size.", avatarColor: "#f0c7ce" },
  { id: "c5", name: "Jordan Reed", email: "jordan@vertexstudio.com", company: "Vertex Studio", role: "Design Lead", owner: "Alex Rivera", labels: ["Priority", "Design"], stage: "Qualified", notes: "Decision-maker identified. Moving forward.", avatarColor: "#d3d8ef" },
  { id: "c6", name: "Leo Martin", email: "leo@bluepeak.com", company: "Bluepeak", role: "Engineering Manager", owner: "Taylor Morgan", labels: ["Technical"], stage: "Qualified", notes: "Pilot discussed. Waiting for internal approval.", avatarColor: "#c4dce9" },
  { id: "c7", name: "Priya Shah", role: "Operations Lead", owner: "Sarah Kim", labels: ["Referral"], stage: "Lead", notes: "Referral contact from an existing client.", avatarColor: "#e7c9e8" },
  { id: "c8", name: "Sam Kim", email: "sam@brightpath.com", company: "BrightPath", role: "CEO", owner: "Alex Rivera", labels: ["Active"], stage: "Qualified", notes: "Existing customer opportunity. Exploring additional options.", avatarColor: "#e8d2ad" },
  { id: "c9", name: "Noah Williams", email: "noah@cedardigital.com", company: "Cedar Digital", role: "Head of Growth", owner: "Sarah Kim", labels: ["Renewal"], stage: "Qualified", notes: "Renewal discussion scheduled for next quarter.", avatarColor: "#c9dfd1" },
  { id: "c10", name: "Olivia Garcia", role: "Product Designer", owner: "Taylor Morgan", labels: ["Design"], stage: "Lead", notes: "Long-term opportunity. Currently evaluating options.", avatarColor: "#efcfb4" },
];
