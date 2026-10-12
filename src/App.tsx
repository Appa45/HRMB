
import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Trash2,
} from "lucide-react";

import AppSidebar from "./components/AppSidebar";
import DatabaseToolbar from "./components/DatabaseToolbar";
import TableView from "./components/TableView";
import BoardView from "./components/BoardView";
import ContactDrawer from "./components/ContactDrawer";
import { initialContacts } from "./data/contacts";
import type {
  Contact,
  ContactStage,
  DatabaseView,
} from "./types/contact";

function ContactsDashboard() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [view, setView] = useState<DatabaseView>("table");
  const [selectedContactId, setSelectedContactId] =
    useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortDescending, setSortDescending] = useState(false);

  // Single and bulk delete confirmation state
  const [contactToDelete, setContactToDelete] =
    useState<Contact | null>(null);
  const [contactsToDelete, setContactsToDelete] =
    useState<Contact[]>([]);

  const selectedContact =
    contacts.find((contact) => contact.id === selectedContactId) ?? null;

  // Search and stage filtering
  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return contacts.filter((contact) => {
      const matchesStage =
        stageFilter === "All" || contact.stage === stageFilter;

      const searchable = [
        contact.name,
        contact.email,
        contact.company,
        contact.role,
        contact.owner,
        contact.notes,
        ...contact.labels,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStage && (!query || searchable.includes(query));
    });
  }, [contacts, search, stageFilter]);

  // Reverse the current filtered order when Sort is clicked
  const sortedContacts = useMemo(() => {
    const result = [...filteredContacts];

    if (sortDescending) {
      result.reverse();
    }

    return result;
  }, [filteredContacts, sortDescending]);

  // Pagination
  const pageCount = Math.max(
    1,
    Math.ceil(sortedContacts.length / pageSize)
  );

  const currentPage = Math.min(page, pageCount);

  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Request bulk deletion from TableView
  const deleteMultipleContacts = (selected: Contact[]) => {
    if (selected.length === 0) return;
    setContactsToDelete(selected);
  };

  // Confirm and delete one or multiple contacts
  const confirmDelete = () => {
    const idsToDelete =
      contactsToDelete.length > 0
        ? contactsToDelete.map((contact) => contact.id)
        : contactToDelete
          ? [contactToDelete.id]
          : [];

    if (idsToDelete.length === 0) return;

    // Count only deleted contacts that belong to the filtered results
    const removedFromFiltered = filteredContacts.filter((contact) =>
      idsToDelete.includes(contact.id)
    ).length;

    const remainingFilteredCount = Math.max(
      0,
      filteredContacts.length - removedFromFiltered
    );

    setContacts((current) =>
      current.filter((contact) => !idsToDelete.includes(contact.id))
    );

    if (
      selectedContactId &&
      idsToDelete.includes(selectedContactId)
    ) {
      setSelectedContactId(null);
    }

    setContactToDelete(null);
    setContactsToDelete([]);

    // Keep pagination on a valid page after deletion
    const nextPageCount = Math.max(
      1,
      Math.ceil(remainingFilteredCount / pageSize)
    );

    setPage((currentPage) =>
      Math.min(currentPage, nextPageCount)
    );
  };

  // Save contact changes without creating duplicate records
  const saveContact = (updated: Contact) => {
    setContacts((current) =>
      current.some((contact) => contact.id === updated.id)
        ? current.map((contact) =>
            contact.id === updated.id ? updated : contact
          )
        : [updated, ...current]
    );

    setSelectedContactId(null);
    setPage(1);
  };

  // Create a new contact
  const createContact = (stage: ContactStage = "Lead") => {
    const id = `c-${Date.now()}`;

    const contact: Contact = {
      id,
      name: "New contact",
      email: "",
      company: "",
      role: "",
      owner: "",
      labels: [],
      stage,
      notes: "",
      avatarColor: "#dbeafe",
    };

    setContacts((current) => [contact, ...current]);
    setPage(1);
    setSelectedContactId(id);
  };

  const closeDeleteDialog = () => {
    setContactToDelete(null);
    setContactsToDelete([]);
  };

  return (
    <div className="app-shell">
      <AppSidebar />

      <main className="main-area">
        <div className="top-bar">
          <div className="breadcrumbs">
            Workspace <ChevronRight size={13} /> Contacts
          </div>

          <div className="top-bar-actions">
            <button
              type="button"
              className="icon-button"
              aria-label="Notifications"
            >
              <Bell size={17} />
            </button>

            <button
              type="button"
              className="icon-button"
              aria-label="Help"
            >
              <HelpCircle size={17} />
            </button>

            <span className="mini-avatar">A</span>
          </div>
        </div>

        <div className="content-area">
          <DatabaseToolbar
            view={view}
            onViewChange={(nextView) => {
              setView(nextView);
              setPage(1);
            }}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onNew={() => createContact()}
            stageFilter={stageFilter}
            onStageFilterChange={(value) => {
              setStageFilter(value);
              setPage(1);
            }}
            onSort={() => {
              setSortDescending((current) => !current);
              setPage(1);
            }}
          />

          <div className="database-body">
            {view === "table" ? (
              <TableView
                contacts={paginatedContacts}
                onSelect={(contact) =>
                  setSelectedContactId(contact.id)
                }
                onNew={() => createContact()}
                onDelete={setContactToDelete}
                onDeleteMany={deleteMultipleContacts}
              />
            ) : (
              <BoardView
                contacts={paginatedContacts}
                onSelect={(contact) =>
                  setSelectedContactId(contact.id)
                }
                onNew={createContact}
                onDelete={setContactToDelete}
              />
            )}
          </div>

          {/* Pagination */}
          <div
            className="pagination-bar"
            aria-label="Contact pagination"
          >
            <div className="pagination-left">
              <span className="pagination-summary">
                Showing{" "}
                {sortedContacts.length > 0
                  ? (currentPage - 1) * pageSize + 1
                  : 0}
                –
                {Math.min(
                  currentPage * pageSize,
                  sortedContacts.length
                )}{" "}
                of {sortedContacts.length}
              </span>

              <label className="rows-per-page">
                <span>Rows per page</span>

                <select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setPage(1);
                  }}
                  aria-label="Rows per page"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>

            <div className="pagination-controls">
              <button
                type="button"
                className="pagination-button"
                onClick={() =>
                  setPage((value) => Math.max(1, value - 1))
                }
                disabled={currentPage <= 1}
              >
                <ChevronLeft size={15} />
                Previous
              </button>

              <span className="pagination-page">
                Page {currentPage} of {pageCount}
              </span>

              <button
                type="button"
                className="pagination-button"
                onClick={() =>
                  setPage((value) =>
                    Math.min(pageCount, value + 1)
                  )
                }
                disabled={currentPage >= pageCount}
              >
                Next
                <ChevronRightIcon size={15} />
              </button>
            </div>
          </div>

          <footer className="page-footer">
            <span>
              {sortedContacts.length}{" "}
              {sortedContacts.length === 1
                ? "contact"
                : "contacts"}
            </span>

            <span>
              ContactHub database{" "}
              <span className="footer-dot">·</span>{" "}
              All changes saved locally in this session
            </span>
          </footer>
        </div>
      </main>

      {/* Contact details drawer */}
      <ContactDrawer
        contact={selectedContact}
        onClose={() => setSelectedContactId(null)}
        onSave={saveContact}
      />

      {/* Single and bulk delete confirmation */}
      {(contactToDelete || contactsToDelete.length > 0) && (
        <div
          className="confirm-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDeleteDialog();
            }
          }}
        >
          <section
            className="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
          >
            <div className="confirm-icon">
              <Trash2 size={19} />
            </div>

            <h2 id="delete-title">
              {contactsToDelete.length > 0
                ? `Delete ${contactsToDelete.length} contacts?`
                : "Delete contact?"}
            </h2>

            <p id="delete-description">
              {contactsToDelete.length > 0 ? (
                <>
                  Are you sure you want to delete{" "}
                  <strong>{contactsToDelete.length} selected contacts</strong>?
                  This action cannot be undone.
                </>
              ) : (
                <>
                  Are you sure you want to delete{" "}
                  <strong>
                    {contactToDelete?.name || "this contact"}
                  </strong>
                  ? This action cannot be undone.
                </>
              )}
            </p>

            <div className="confirm-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={closeDeleteDialog}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-button"
                onClick={confirmDelete}
              >
                <Trash2 size={14} />
                Delete{" "}
                {contactsToDelete.length > 0 ? "selected" : "contact"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function SimpleRoutePage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="app-shell">
      <AppSidebar />

      <main className="main-area">
        <div className="top-bar">
          <div className="breadcrumbs">
            Workspace <ChevronRight size={13} /> {title}
          </div>

          <div className="top-bar-actions">
            <button
              type="button"
              className="icon-button"
              aria-label="Notifications"
            >
              <Bell size={17} />
            </button>

            <button
              type="button"
              className="icon-button"
              aria-label="Help"
            >
              <HelpCircle size={17} />
            </button>

            <span className="mini-avatar">A</span>
          </div>
        </div>

        <div className="content-area">
          <div className="page-heading">
            <div className="heading-icon">
              <span>✦</span>
            </div>

            <div>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>

          <div className="database-body route-placeholder">
            <p>
              This page is ready for your{" "}
              {title.toLowerCase()} features.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ContactsDashboard />} />

      <Route
        path="/tasks"
        element={
          <SimpleRoutePage
            title="Tasks"
            description="Keep track of your next steps."
          />
        }
      />

      <Route
        path="/notes"
        element={
          <SimpleRoutePage
            title="Notes"
            description="Notes for your workspace."
          />
        }
      />

      <Route
        path="/settings"
        element={
          <SimpleRoutePage
            title="Settings"
            description="Manage your workspace preferences."
          />
        }
      />

      <Route
        path="/search"
        element={
          <SimpleRoutePage
            title="Search"
            description="Search across your workspace."
          />
        }
      />

      <Route
        path="/inbox"
        element={
          <SimpleRoutePage
            title="Inbox"
            description="Your workspace updates and activity."
          />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
