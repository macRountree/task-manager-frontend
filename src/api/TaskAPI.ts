import api from '@/lib/axios';
import {Project, TaskFormData} from '../interfaces/index';
import {isAxiosError} from 'axios';

interface TaskAPIDATA {
  taskData: TaskFormData;
  projectId: Project['_id'];
}
export async function createTask({
  taskData,
  projectId,
}: Pick<TaskAPIDATA, 'taskData' | 'projectId'>) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const {data} = await api.post<string>(url, taskData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
