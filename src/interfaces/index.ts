import {z} from 'zod';

export const taskStatusSchema = z.enum([
  'pending',
  'onHold',
  'inProgress',
  'underReview',
  'completed',
]);
//*tasks Schema
export const TaskSchema = z.object({
  _id: z.string(),
  taskName: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema, //*need start with pending
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, 'taskName' | 'description'>;
//*Projects Schema

export const ProjectSchema = z.object({
  _id: z.string(), //* _id mongoDB id
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const dashboardProjectSchema = z.array(
  ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);

export type Project = z.infer<typeof ProjectSchema>;

export type ProjectFormData = Pick<
  Project,
  'clientName' | 'projectName' | 'description'
>;
