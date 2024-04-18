import {
  Button,
  Divider,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useState } from 'react'
import { DataTableProps } from './types'

export default function DataTable({
  data,
  columns,
  actions,
  pagination,
}: DataTableProps) {
  const [page, setPage] = useState(pagination?.page || 1)

  const handlePageChange = (page: number) =>
    pagination &&
    page >= 1 &&
    page <= pagination.total &&
    ((pagination.page = page), pagination.onChangePage(page), setPage(page))
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {columns?.map((column) => (
              <Th key={column.key}>{column.title}</Th>
            ))}

            {actions && (
              <Th>
                <Text>Ações</Text>
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((row) => (
            <Tr key={row.id}>
              {columns?.map((column) => (
                <Td key={column.key}>{row[column.key]}</Td>
              ))}
              {actions?.map((action) => (
                <Td key={action.key}>
                  <Stack
                    direction={'row'}
                    align={'center'}
                    key={action.key}
                    spacing={0}
                  >
                    <Button
                      size={'xs'}
                      colorScheme={action.color}
                      onClick={() => action.handler(row)}
                      mr={1}
                    >
                      {action.label}
                    </Button>
                  </Stack>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Divider />
      {pagination && (
        <Flex mt={4} justifyContent={'space-between'}>
          <Text size={'5'} ml={2} mr={2}>
            Mostrando {page} de {pagination.total} páginas
          </Text>

          <Flex flexDirection={'row'}>
            <Button
              ml={2}
              onClick={() => handlePageChange(page - 1)}
              isDisabled={!pagination.prev}
            >
              Anterior
            </Button>
            <Button
              ml={2}
              onClick={() => handlePageChange(page + 1)}
              isDisabled={!pagination.next}
            >
              Próximo
            </Button>
          </Flex>
        </Flex>
      )}
    </TableContainer>
  )
}
