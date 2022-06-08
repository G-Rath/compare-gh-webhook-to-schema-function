export * from './archived';
export * from './converted';
export * from './created';
export * from './deleted';
export * from './edited';
export * from './reordered';
export * from './restored';

import { ProjectsV2ItemArchivedEvent } from './archived';
import { ProjectsV2ItemConvertedEvent } from './converted';
import { ProjectsV2ItemCreatedEvent } from './created';
import { ProjectsV2ItemDeletedEvent } from './deleted';
import { ProjectsV2ItemEditedEvent } from './edited';
import { ProjectsV2ItemReorderedEvent } from './reordered';
import { ProjectsV2ItemRestoredEvent } from './restored';

export type ProjectsV2ItemEvent =
  | ProjectsV2ItemArchivedEvent
  | ProjectsV2ItemConvertedEvent
  | ProjectsV2ItemCreatedEvent
  | ProjectsV2ItemDeletedEvent
  | ProjectsV2ItemEditedEvent
  | ProjectsV2ItemReorderedEvent
  | ProjectsV2ItemRestoredEvent;
