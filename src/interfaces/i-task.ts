import type { PriorityLevelEnum } from '@/enums/priority-level.enum.js'
import type { TaskStatusEnum } from '@/enums/task-status.enum.js'
import type { TaskTypeEnum } from '@/enums/task-type.enum.js'

export interface ITask {
  id: string;
  type: TaskTypeEnum;
  status: TaskStatusEnum;
  priority: PriorityLevelEnum;
  data: Record<string, unknown>;
  agentId?: string;
  parentTaskId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  error?: string;
}
