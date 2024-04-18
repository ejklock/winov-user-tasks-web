import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
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
                <Td key={column.key}>
                  {column.formatter
                    ? column.formatter(row[column.key])
                    : row[column.key]}
                </Td>
              ))}
              <Td key={`td-${row.id}`}>
                <ButtonGroup
                  key={`td-${row.id}`}
                  size='sm'
                  isAttached
                  variant='outline'
                >
                  {actions?.map((action) => (
                    <Button
                      key={action.key}
                      size={'sm'}
                      colorScheme={action.color}
                      onClick={() => action.handler(row)}
                    >
                      {action?.icon && (
                        <Box mr={1}>
                          <action.icon />
                        </Box>
                      )}
                      {action.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Divider />
      {pagination && data.length > 0 && (
        <Flex mt={4} justifyContent={'space-between'}>
          <Text size={'5'} ml={2} mr={2}>
            Mostrando {page} de {pagination.total} página(s)
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
