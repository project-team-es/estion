import { useState, useEffect } from 'react';
import axios from 'axios';
import { router, useForm } from '@inertiajs/react';
import { icons } from '@/Utils/icons';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableBookmarkItem({ bookmark, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: bookmark.id,
  });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <li ref={setNodeRef} style={style} className="flex items-center justify-between py-3">
      <div className="flex min-w-0 items-center gap-2">
        <span
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
        >
          ⠿
        </span>
        <a
          href={bookmark.url}
          className="truncate font-bold text-blue-500 hover:text-blue-800"
          target="_blank"
          rel="noreferrer"
        >
          {bookmark.name}
        </a>
      </div>
      <div className="ml-4 flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={() => router.visit(route('bookmark.edit', bookmark.id))}
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
          dangerouslySetInnerHTML={{ __html: icons.edit_mini }}
        />
        <button
          type="button"
          onClick={() => onDelete(bookmark.id)}
          className="text-red-600 hover:text-red-800 focus:outline-none"
          dangerouslySetInnerHTML={{ __html: icons.trash_mini }}
        />
      </div>
    </li>
  );
}

export function BookmarkIndex({ bookmarks: initialBookmarks }) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const { delete: destroy } = useForm({});

  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDelete = (id) => {
    if (confirm('本当にこのURLを削除しますか？')) {
      destroy(route('bookmark.destroy', { bookmark: id }), {
        preserveScroll: true,
        onSuccess: () => {},
        onError: (errors) => {
          console.error('URLの削除に失敗しました:', errors);
        },
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = bookmarks.findIndex((b) => b.id === active.id);
    const newIndex = bookmarks.findIndex((b) => b.id === over.id);
    const newOrder = arrayMove(bookmarks, oldIndex, newIndex);
    setBookmarks(newOrder);
    axios.patch(route('bookmark.reorder'), { ids: newOrder.map((b) => b.id) }).then(() => {
      router.reload({ only: ['bookmarks'], preserveScroll: true, preserveState: true });
    });
  };

  return (
    <div className="mt-8 overflow-hidden rounded-[12px] border bg-white p-8">
      <h2 className="mb-6 text-2xl font-bold">登録されたURL一覧</h2>
      {bookmarks && bookmarks.length > 0 ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={bookmarks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {bookmarks.map((bookmark) => (
                <SortableBookmarkItem
                  key={bookmark.id}
                  bookmark={bookmark}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      ) : (
        <p className="text-gray-500">登録されたURLはありません。</p>
      )}
    </div>
  );
}
