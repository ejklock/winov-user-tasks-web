import { Box, Button, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useTaskApi from '../hooks/task/use-task-api'
import DataTable from './DataTable'
import { ActionColumnColors } from './DataTable/types'
import Modal from './Modal'
import TaskForm from './TaskForm'

type Task = {
  id: number
  title: string
  description: string
  completed_at: Date
  created_at: Date
}

export default function TasksComponent() {
  const {
    page,
    perPage,
    setPage,
    setPerPage,
    tasks,
    fetchTasksPaginated,
    deleteTask,
    createTask,
    updateTask,
  } = useTaskApi()

  useEffect(() => {
    fetchTasksPaginated()
  }, [page, perPage])

  const handleDeleteTaskButton = (taskId: string) => {
    deleteTask(taskId)
  }
  const handleUpdateTaskButton = (values: Task) => {
    updateTask({
      id: values?.id,
      title: values?.title,
      description: values?.description,
    })
    onClose()
  }

  const handleCreateTaskButton = (values: Task) => {
    createTask({
      title: values?.title,
      description: values?.description,
    })
    onClose()
  }

  const tableData = tasks?.data?.map((task) => ({
    id: task.id,
    key: task.id,
    title: task.title,
    description: task.description,
  }))

  const [isOpen, setIsOpen] = useState(false)

  const [initialValues, setInitialValues] = useState({
    id: undefined,
    title: '',
    description: '',
  })

  const [formHandler, setFormHandler] = useState(() => handleCreateTaskButton)
  const onOpen = () => setIsOpen(true)
  const onClose = () => {
    setInitialValues({
      id: undefined,
      title: '',
      description: '',
    })
    setIsOpen(false)
  }

  return (
    <div>
      <Box mt={4} mb={8}>
        <Flex justifyContent='flex-end' mt={8}>
          <Button colorScheme='green' onClick={onOpen}>
            Criar Tarefa
          </Button>
        </Flex>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          headerText='Criar Tarefa'
        >
          <TaskForm
            resetForm={onClose}
            initialValues={initialValues}
            handleSubmit={formHandler}
          />
        </Modal>
        <DataTable
          data={tableData || []}
          columns={[
            {
              key: 'title',
              title: 'Tarefa',
            },
            {
              key: 'description',
              title: 'Descrição',
            },
          ]}
          actions={[
            {
              key: 'edit',
              label: 'Editar',
              color: ActionColumnColors.blue,
              handler: (task) => {
                setFormHandler(() => handleUpdateTaskButton)
                setInitialValues({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                })

                onOpen()
              },
            },
            {
              key: 'delete',
              label: 'Excluir',
              color: ActionColumnColors.red,
              handler: (task) => {
                handleDeleteTaskButton(task.id)
              },
            },
          ]}
          pagination={{
            page,
            next: !!tasks?.links?.next,
            prev: !!tasks?.links?.prev,
            perPage,
            total: tasks?.meta?.last_page || 0,
            onChangePage: setPage,
            onChangePerPage: setPerPage,
          }}
        />
      </Box>
    </div>
  )
}
