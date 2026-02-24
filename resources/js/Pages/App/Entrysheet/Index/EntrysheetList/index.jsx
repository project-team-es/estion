import EntrysheetListItem from './EntrysheetListItem';

export default function EntrysheetList({ entrysheets, onDelete }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {entrysheets.map((entrysheet) => (
        <EntrysheetListItem key={entrysheet.id} entrysheet={entrysheet} onDelete={onDelete} />
      ))}
    </div>
  );
}
