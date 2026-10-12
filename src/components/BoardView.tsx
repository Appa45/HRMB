
import { MoreHorizontal, Plus, Trash2 } from "lucide-react";
import type { Contact, ContactStage } from "../types/contact";
import { STAGES } from "../data/contacts";
import ContactAvatar from "./ContactAvatar";

interface Props {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
  onNew: (stage?: ContactStage) => void;
  onDelete: (contact: Contact) => void;
}

export default function BoardView({
  contacts,
  onSelect,
  onNew,
  onDelete,
}: Props) {
  return (
    <div className="board-scroll">
      <div className="board-grid">
        {STAGES.map((stage) => {
          const items = contacts.filter(
            (contact) => contact.stage === stage
          );

          return (
            <section
              className={`board-column column-${stage.toLowerCase()}`}
              key={stage}
              aria-label={`${stage} contacts`}
            >
              <div className="column-heading">
                <span className={`column-dot dot-${stage.toLowerCase()}`} />
                <h2>{stage}</h2>
                <span className="column-count">{items.length}</span>
                <span className="column-spacer" />

                <button
                  type="button"
                  className="icon-button small-icon"
                  onClick={() => onNew(stage)}
                  aria-label={`Add ${stage.toLowerCase()} contact`}
                >
                  <Plus size={16} />
                </button>

                <button
                  type="button"
                  className="icon-button small-icon"
                  aria-label={`${stage} options`}
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className="board-cards">
                {items.map((contact) => (
                  <article className="contact-card" key={contact.id}>
                    <button
                      type="button"
                      className="card-open-button"
                      onClick={() => onSelect(contact)}
                      aria-label={`Open ${contact.name} details`}
                    >
                      <div className="card-person">
                        <ContactAvatar
                          name={contact.name}
                          color={contact.avatarColor}
                        />
                        <div className="card-title">
                          <strong>{contact.name}</strong>
                          <span>
                            {contact.company || "No company"}
                            {contact.role ? ` · ${contact.role}` : ""}
                          </span>
                        </div>
                      </div>

                      <div className="label-list card-labels">
                        {contact.labels.slice(0, 2).map((label) => (
                          <span
                            className={`label-chip label-${label
                              .toLowerCase()
                              .replace(/[^a-z]/g, "")}`}
                            key={label}
                          >
                            {label}
                          </span>
                        ))}
                      </div>

                      <p className="card-notes">
                        {contact.notes || "No notes yet."}
                      </p>
                    </button>

                    <button
                      type="button"
                      className="card-delete-button"
                      onClick={() => onDelete(contact)}
                      aria-label={`Delete ${contact.name}`}
                      title="Delete contact"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </article>
                ))}

                <button
                  type="button"
                  className="add-card"
                  onClick={() => onNew(stage)}
                >
                  <Plus size={15} />
                  New contact
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
