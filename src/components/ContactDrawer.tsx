import { useEffect, useState } from "react";
import { CalendarClock, Check, ChevronDown, FileText, Mail, MoreHorizontal, Plus, Tag, UserRound, X } from "lucide-react";
import type { Contact, ContactStage } from "../types/contact";
import { STAGES } from "../data/contacts";
import ContactAvatar from "./ContactAvatar";

interface Props { contact: Contact | null; onClose: () => void; onSave: (contact: Contact) => void; }

export default function ContactDrawer({ contact, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<Contact | null>(contact);
  const [labelInput, setLabelInput] = useState("");

  useEffect(() => { setDraft(contact); setLabelInput(""); }, [contact]);

  if (!contact || !draft) return null;

  const update = <K extends keyof Contact>(key: K, value: Contact[K]) => setDraft((current) => current ? { ...current, [key]: value } : current);
  const addLabel = () => {
    const label = labelInput.trim();
    if (label && !draft.labels.includes(label)) update("labels", [...draft.labels, label]);
    setLabelInput("");
  };

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="contact-drawer" aria-label={`Edit ${contact.name}`} role="dialog" aria-modal="true">
        <div className="drawer-top"><span className="drawer-breadcrumb">Contacts <span>/</span> {contact.name}</span><div><button className="icon-button" aria-label="More contact actions"><MoreHorizontal size={18} /></button><button className="icon-button" onClick={onClose} aria-label="Close details"><X size={18} /></button></div></div>
        <div className="drawer-cover"><span>Cover image</span><button>Change cover</button></div>
        <div className="drawer-content">
          <div className="drawer-profile"><ContactAvatar name={draft.name || "New Contact"} color={draft.avatarColor} size="lg" /><div className="profile-actions"><button className="subtle-button"><Plus size={14} />Add cover</button><button className="subtle-button"><CalendarClock size={14} />Activity</button></div></div>
          <input className="contact-title-input" value={draft.name} onChange={(event) => update("name", event.target.value)} aria-label="Contact name" placeholder="Contact name" />
          <p className="drawer-hint">Contact record · Last edited just now</p>
          <div className="detail-properties">
            <label className="detail-row"><span className="detail-label"><Mail size={15} />Email</span><input value={draft.email || ""} onChange={(event) => update("email", event.target.value)} placeholder="Add email" type="email" /></label>
            <label className="detail-row"><span className="detail-label"><span className="property-icon">▦</span>Company</span><input value={draft.company || ""} onChange={(event) => update("company", event.target.value)} placeholder="Add company" /></label>
            <label className="detail-row"><span className="detail-label"><span className="property-icon">≡</span>Role</span><input value={draft.role || ""} onChange={(event) => update("role", event.target.value)} placeholder="Add role" /></label>
            <label className="detail-row"><span className="detail-label"><UserRound size={15} />Owner</span><select value={draft.owner || ""} onChange={(event) => update("owner", event.target.value)}><option value="">Unassigned</option><option>Sarah Kim</option><option>Alex Rivera</option><option>Taylor Morgan</option></select></label>
            <div className="detail-row labels-row"><span className="detail-label"><Tag size={15} />Labels</span><div className="drawer-labels">{draft.labels.map((label) => <span className="label-chip label-edit" key={label}>{label}<button aria-label={`Remove ${label} label`} onClick={() => update("labels", draft.labels.filter((item) => item !== label))}><X size={11} /></button></span>)}<form className="add-label-form" onSubmit={(event) => { event.preventDefault(); addLabel(); }}><input value={labelInput} onChange={(event) => setLabelInput(event.target.value)} placeholder="+ Add label" aria-label="Add label" /></form></div></div>
            <label className="detail-row"><span className="detail-label"><span className="property-icon">◉</span>Stage</span><span className="select-wrap"><select value={draft.stage} onChange={(event) => update("stage", event.target.value as ContactStage)}>{STAGES.map((stage) => <option key={stage}>{stage}</option>)}</select><ChevronDown size={14} /></span></label>
          </div>
          <section className="notes-editor"><h3><FileText size={15} />Notes</h3><textarea value={draft.notes || ""} onChange={(event) => update("notes", event.target.value)} placeholder="Write a note…" rows={5} /></section>
          <section className="activity-section"><h3>Activity</h3><div className="activity-item"><span className="activity-dot" /><span><strong>{draft.owner || "You"}</strong> edited Stage</span><time>Just now</time></div><div className="activity-item"><span className="activity-dot pale" /><span>You created this page</span><time>1 week ago</time></div></section>
        </div>
        <div className="drawer-footer"><button className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={() => onSave(draft)}><Check size={15} />Save changes</button></div>
      </aside>
    </div>
  );
}
