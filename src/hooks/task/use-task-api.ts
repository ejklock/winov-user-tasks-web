import { useCallback, useState } from 'react'
import { ApiPaginatedResponse } from '../api/api.types'
import useApi from '../api/use-api'
import { Task } from './task.types'

const useTaskApi = () => {
  const [tasks, setTasks] = useState<ApiPaginatedResponse<Task>>()
  const { request, setError } = useApi<ApiPaginatedResponse<Task>>()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [apiError, setApiError] = useState<Record<string, string>>()

  const fetchTasksPaginated = useCallback(async () => {
    await request<ApiPaginatedResponse<Task>>(
      'GET',
      `tasks?page=${page}&per_page=${perPage}`,
      undefined,
      undefined,
      setTasks,
      setError
    )
  }, [page, perPage, request, setTasks, setError])

  const deleteTask = useCallback(
    (id: number | string) => {
      request(
        'DELETE',
        `tasks/${id}`,
        undefined,
        undefined,
        () => {
          fetchTasksPaginated()
        },
        (error) => {
          setApiError(error)
          setError(error)
        }
      )
    },
    [request, fetchTasksPaginated, setError, setApiError]
  )

  const createTask = (values: Task) => {
    request(
      'POST',
      'tasks',
      values,
      undefined,
      () => {
        fetchTasksPaginated()
      },
      (error) => {
        if (error.errors) {
          const { errors } = error
          const errorsToSet = {} as {
            [key: string]: string
          }

          for (const field in errors) {
            errorsToSet[field] = errors[field][0]
          }

          setApiError(error)
          setError(error)
        } else {
          alert(error.message)
        }
      }
    )
  }

  const updateTask = useCallback(
    (values: Task) => {
      request(
        'PUT',
        `tasks/${values.id}`,
        values,
        undefined,
        () => {
          fetchTasksPaginated()
        },
        setError
      )
    },
    [request, fetchTasksPaginated, setError]
  )
  return {
    deleteTask,
    fetchTasksPaginated,
    page,
    perPage,
    setError,
    apiError,
    setPage,
    setPerPage,
    setApiError,
    tasks,
    createTask,
    updateTask,
  }
}

export default useTaskApi
