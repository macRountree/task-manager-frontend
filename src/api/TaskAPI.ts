import api from '@/lib/axios';
import {Project, Task, TaskFormData, TaskSchema} from '../interfaces/index';
import {isAxiosError} from 'axios';

interface TaskAPIDATA {
  taskData: TaskFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
  status: Task['status'];
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

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPIDATA, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const {data} = await api(url);
    const response = TaskSchema.safeParse(data);
    // return data;
    console.log(response.data);
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.error.errors[0].message);
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTask({
  taskData,
  projectId,
  taskId,
}: Pick<TaskAPIDATA, 'taskData' | 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const {data} = await api.put<string>(url, taskData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskAPIDATA, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const {data} = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTaskStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPIDATA, 'projectId' | 'taskId' | 'status'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`;
    const {data} = await api.post<string>(url, {status});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
