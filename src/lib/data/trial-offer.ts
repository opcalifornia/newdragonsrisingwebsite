import { getModuleBySlug } from "./modules";

/**
 * The trial funnel gives away one unit of one module — a real piece of
 * the curriculum, not a marketing teaser. Esgrima Basics is the natural
 * choice: it's the only Beginner module with no prerequisites, and its
 * first unit is where every student starts anyway.
 *
 * Which module, and how much of it, is a business decision. Change the
 * two constants below and the trial page, the module detail page's
 * "free preview" badges, and the unlock screen all follow. Confirm with
 * the client before launch.
 */
export const TRIAL_MODULE_SLUG = "esgrima-basics";
export const TRIAL_FREE_UNIT_INDEX = 0;

export function getTrialOffer() {
  const trialModule = getModuleBySlug(TRIAL_MODULE_SLUG);
  if (!trialModule) return null;

  const freeUnit = trialModule.curriculum[TRIAL_FREE_UNIT_INDEX];
  if (!freeUnit) return null;

  const lockedUnits = trialModule.curriculum.filter(
    (_, i) => i !== TRIAL_FREE_UNIT_INDEX,
  );

  return {
    module: trialModule,
    freeUnit,
    freeLessons: freeUnit.lessons,
    lockedUnits,
    lockedLessonCount: lockedUnits.flatMap((u) => u.lessons).length,
  };
}

/** True for lessons the trial gives away, so the catalog can badge them. */
export function isFreePreviewLesson(moduleSlug: string, lessonId: string) {
  if (moduleSlug !== TRIAL_MODULE_SLUG) return false;
  const offer = getTrialOffer();
  return Boolean(offer?.freeLessons.some((l) => l.id === lessonId));
}
