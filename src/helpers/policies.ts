import {Project, TeamMember} from '../interfaces';
export const isManager = (
  managerId: Project['manager'],
  userID: TeamMember['_id']
) => {
  return managerId === userID;
};
