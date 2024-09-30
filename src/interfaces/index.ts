import {z} from 'zod';

//*Projects Schema

export const ProjectSchema = z.object({
  _id: z.string(), //* _id mongoDB id
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

export type ProjectFormData = Pick<
  Project,
  'clientName' | 'projectName' | 'description'
>;
