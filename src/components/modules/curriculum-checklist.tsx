"use client";

import { useState, useTransition } from "react";
import { toggleLessonComplete } from "@/app/actions/enrollment";
import { LessonPlayer } from "./lesson-player";
import type { TrainingModule } from "@/lib/data/modules";

export function CurriculumChecklist({
  moduleSlug,
  curriculum,
  initialCompletedLessonIds,
}: {
  moduleSlug: string;
  curriculum: TrainingModule["curriculum"];
  initialCompletedLessonIds: string[];
}) {
  const [completed, setCompleted] = useState(new Set(initialCompletedLessonIds));
  const [, startTransition] = useTransition();

  const allLessons = curriculum.flatMap((unit) => unit.lessons);
  const currentLesson =
    allLessons.find((l) => !completed.has(l.id)) ?? allLessons[0];

  function toggle(lessonId: string, checked: boolean) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (checked) next.add(lessonId);
      else next.delete(lessonId);
      return next;
    });
    startTransition(async () => {
      await toggleLessonComplete(moduleSlug, lessonId, checked);
    });
  }

  return (
    <div>
      {currentLesson && (
        <div className="mb-8">
          <LessonPlayer lessonTitle={currentLesson.title} />
        </div>
      )}

      <div className="space-y-4">
        {curriculum.map((unit) => (
          <div key={unit.title} className="rounded-sm border border-surface-border p-5">
            <p className="font-medium text-white">{unit.title}</p>
            <ul className="mt-3 space-y-2">
              {unit.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-text-body">
                    <input
                      type="checkbox"
                      checked={completed.has(lesson.id)}
                      onChange={(e) => toggle(lesson.id, e.target.checked)}
                      className="h-4 w-4 rounded-sm border-surface-border bg-surface accent-red-core"
                    />
                    <span className={completed.has(lesson.id) ? "text-text-muted line-through" : ""}>
                      {lesson.title}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
