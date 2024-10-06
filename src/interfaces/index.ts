import {z} from 'zod';

export const taskStatusSchema = z.enum([
  'pending',
  'onHold',
  'inProgress',
  'underReview',
  'completed',
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

//*tasks Schema
export const TaskSchema = z.object({
  _id: z.string(),
  taskName: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema, //*need start with pending
  createdAt: z.string(), //* check The Database
  updatedAt: z.string(), //* check The Database
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
