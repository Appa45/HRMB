
import { useEffect, useState } from "react";
import {
  AtSign,
  BriefcaseBusiness,
  CircleDot,
  FileText,
  Plus,
  Tag,
  UserRound,
  Trash2,
  X,
} from "lucide-react";

import type { Contact } from "../types/contact";
import ContactAvatar from "./ContactAvatar";
import StageBadge from "./StageBadge";

interface Props {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
  onNew: () => void;
  onDelete: (contact: Contact) => void;
  onDeleteMany: (contacts: Contact[]) => void;
}

export default function TableView({
  contacts,
  onSelect,
  onNew,
  onDelete,
  onDeleteMany,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Clear selections when the visible page or its contacts change
  useEffect(() => {
    setSelectedIds([]);
  }, [contacts]);

  const allSelected =
    contacts.length > 0 &&
    contacts.every((contact) => selectedIds.includes(contact.id));

  const toggleAll = () => {
    setSelectedIds(
      allSelected ? [] : contacts.map((contact) => contact.id)
    );
  };

  const toggleContact = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    );
  };

  const selectedContacts = contacts.filter((contact) =>
    selectedIds.includes(contact.id)
  );

  return (
    <div className="table-scroll">
      {selectedIds.length > 0 && (
        <div className="bulk-actions-bar">
          <div className="bulk-selection-info">
            <span className="bulk-count">
              {selectedIds.length}
            </span>
            <span>
              {selectedIds.length === 1
                ? "contact selected"
                : "contacts selected"}
            </span>
          </div>

          <div className="bulk-actions">
            <button
              type="button"
              className="bulk-cancel-button"
              onClick={() => setSelectedIds([])}
            >
              <X size={14} />
              Clear selection
            </button>

            <button
              type="button"
              className="bulk-delete-button"
              onClick={() => {
                onDeleteMany(selectedContacts);
                setSelectedIds([]);
              }}
            >
              <Trash2 size={14} />
              Delete selected
            </button>
          </div>
        </div>
      )}

      <table className="contacts-table">
        <thead>
          <tr>
            <th className="check-col">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                aria-label="Select all contacts on this page"
                disabled={contacts.length === 0}
              />
            </th>
            <th>
              <span className="property-heading">Aa</span>Name
            </th>
            <th><AtSign size={14} />Email</th>
            <th><BriefcaseBusiness size={14} />Company</th>
            <th><ListRoleIcon />Role</th>
            <th><UserRound size={14} />Owner</th>
            <th><Tag size={14} />Labels</th>
            <th><CircleDot size={14} />Stage</th>
            <th><FileText size={14} />Notes</th>
            <th className="action-col" aria-label="Actions" />
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              onClick={() => onSelect(contact)}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(contact);
                }
              }}
            >
              <td
                className="check-col"
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(contact.id)}
                  onChange={() => toggleContact(contact.id)}
                  aria-label={`Select ${contact.name}`}
                />
              </td>

              <td>
                <div className="name-cell">
                  <ContactAvatar
                    name={contact.name}
                    color={contact.avatarColor}
                    size="sm"
                  />
                  <span>{contact.name}</span>
                </div>
              </td>

              <td>
                {contact.email ? (
                  <a
                    className="email-link"
                    href={`mailto:${contact.email}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {contact.email}
                  </a>
                ) : (
                  <span className="muted">—</span>
                )}
              </td>

              <td>
                {contact.company || <span className="muted">—</span>}
              </td>

              <td>
                {contact.role || <span className="muted">—</span>}
              </td>

              <td>
                <span className="owner-cell">
                  <span className="owner-avatar">
                    {(contact.owner || "?")
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  {contact.owner || <span className="muted">—</span>}
                </span>
              </td>

              <td>
                <div className="label-list">
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
              </td>

              <td>
                <StageBadge stage={contact.stage} />
              </td>

              <td className="notes-cell" title={contact.notes}>
                {contact.notes || (
                  <span className="muted">Add notes…</span>
                )}
              </td>

              <td
                className="action-col"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="delete-icon-button"
                  onClick={() => onDelete(contact)}
                  aria-label={`Delete ${contact.name}`}
                  title="Delete contact"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}

          <tr className="new-row" onClick={onNew}>
            <td />
            <td colSpan={9}>
              <button type="button">
                <Plus size={15} />
                New page
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {contacts.length === 0 && (
        <div className="empty-search">
          No contacts match your search.
        </div>
      )}
    </div>
  );
}

function ListRoleIcon() {
  return <span className="property-heading">≡</span>;
}
