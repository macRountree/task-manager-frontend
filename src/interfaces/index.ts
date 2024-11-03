import {z} from 'zod';

//*Auth and Users Schema
export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<
  Auth,
  'name' | 'email' | 'password' | 'password_confirmation'
>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordFormu = Pick<Auth, 'password' | 'password_confirmation'>;
export type TokenConfirmation = Pick<Auth, 'token'>; //* create Token Type for state of Token
export type ChangePasswordForm = Pick<
  Auth,
  'current_password' | 'password' | 'password_confirmation'
>;
export type CheckPasswordForm = Pick<Auth, 'password'>;

//*User Schema
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });

export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;

//*NOTES  Schema

export const NoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});

export type Note = z.infer<typeof NoteSchema>;
export type NoteFormData = Pick<Note, 'content'>;
//*Task Schema
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
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema,
    })
  ),
  notes: z.array(NoteSchema.extend({createdBy: userSchema})),
  createdAt: z.string(), //* check The Database
  updatedAt: z.string(), //* check The Database
});
export const taskProjectSchema = TaskSchema.pick({
  _id: true,
  taskName: true,
  description: true,
  status: true,
});
export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, 'taskName' | 'description'>;
export type TaskProject = z.infer<typeof taskProjectSchema>;
//*Projects Schema

export const ProjectSchema = z.object({
  _id: z.string(), //* _id mongoDB id
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({_id: true})),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({_id: true}))),
});

export const editProjectSchema = ProjectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
});

export const dashboardProjectSchema = z.array(
  ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

export type Project = z.infer<typeof ProjectSchema>;

export type ProjectFormData = Pick<
  Project,
  'clientName' | 'projectName' | 'description'
>;

//*Project Team Schema
export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
});

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;
