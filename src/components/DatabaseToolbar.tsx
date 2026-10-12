import { ArrowDownUp, ChevronDown, Filter, LayoutGrid, List, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react";
import type { DatabaseView } from "../types/contact";

interface Props {
  view: DatabaseView;
  onViewChange: (view: DatabaseView) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onNew: () => void;
  stageFilter: string;
  onStageFilterChange: (value: string) => void;
  onSort: () => void;
}

export default function DatabaseToolbar({ view, onViewChange, search, onSearchChange, onNew, stageFilter, onStageFilterChange, onSort }: Props) {
  return (
    <>
      <div className="page-heading">
        <div className="heading-icon"><span>♟</span></div>
        <div><h1>Contacts</h1><p>A list of people and companies we work with.</p></div>
        {/* <button className="icon-button heading-more" aria-label="More page actions"><MoreHorizontal size={19} /></button> */}
      </div>
      <div className="database-toolbar">
        <div className="view-tabs" role="tablist" aria-label="Database views">
          <button role="tab" aria-selected={view === "table"} className={`view-tab ${view === "table" ? "selected" : ""}`} onClick={() => onViewChange("table")}><List size={16} />Table</button>
          <button role="tab" aria-selected={view === "board"} className={`view-tab ${view === "board" ? "selected" : ""}`} onClick={() => onViewChange("board")}><LayoutGrid size={16} />Board</button>
          <button className="icon-button add-view" aria-label="Add view" title="Add view"><Plus size={17} /></button>
        </div>
        <div className="toolbar-actions">
          <label className="search-box"><Search size={15} /><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search contacts" aria-label="Search contacts" /></label>
         
<div className="filter-control">
  <Filter size={14} />

  <select
    className="stage-filter-select"
    value={stageFilter}
    onChange={(event) =>
      onStageFilterChange(event.target.value)
    }
    aria-label="Filter by stage"
  >
    <option value="All">All stages</option>
    <option value="Lead">Lead</option>
    <option value="Prospect">Prospect</option>
    <option value="Qualified">Qualified</option>
    <option value="Customer">Customer</option>
  </select>

  <ChevronDown size={13} className="filter-chevron" />
</div>

<button
  className="toolbar-button"
  title="Reverse contact order"
  onClick={onSort}
>
  <ArrowDownUp size={14} />
  Sort
</button>
          <button className="icon-button more-toolbar" aria-label="More options"><MoreHorizontal size={18} /></button>
          <button className="primary-button" onClick={onNew}><Plus size={16} />New <ChevronDown size={14} /></button>
        </div>
      </div>
    </>
  );
}
