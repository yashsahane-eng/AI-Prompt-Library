import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import PromptCard from "./PromptCard";
import { usePrompt } from "../../context/PromptContext";

function PromptGrid() {
  const {
    filteredPrompts,
    prompts,
    setPrompts,
  } = usePrompt();

  const handleDragEnd = (
    event: DragEndEvent
  ) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex =
      filteredPrompts.findIndex(
        (prompt) =>
          prompt.id === active.id
      );

    const newIndex =
      filteredPrompts.findIndex(
        (prompt) =>
          prompt.id === over.id
      );

    const reorderedFiltered =
      arrayMove(
        filteredPrompts,
        oldIndex,
        newIndex
      );

    const reorderedIds =
      reorderedFiltered.map(
        (prompt) => prompt.id
      );

    const updatedPrompts = prompts.sort(
      (a, b) =>
        reorderedIds.indexOf(a.id) -
        reorderedIds.indexOf(b.id)
    );

    setPrompts(updatedPrompts);
  };

  if (filteredPrompts.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        <h2 className="text-xl font-semibold">
          No prompts found
        </h2>

        <p className="mt-2">
          Try a different search or create a new prompt.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredPrompts.map(
          (prompt) => prompt.id
        )}
        strategy={rectSortingStrategy}
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default PromptGrid;