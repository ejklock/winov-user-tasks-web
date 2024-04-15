import { Container, Heading, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'

type CenterContainerProps = {
  children: React.ReactNode
  headingText: string
}

const CenterContainer: ({
  children,
  headingText,
}: CenterContainerProps) => JSX.Element = ({ children, headingText }) => {
  return (
    <Container
      maxW='lg'
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={{ base: 'xs', md: 'sm' }}>{headingText}</Heading>
            <Text color='fg.muted'>
              Não possui uma conta?{' '}
              <Link href='/register'>Criar uma conta</Link>
            </Text>
          </Stack>
        </Stack>
        {children}
      </Stack>
    </Container>
  )
}

export default CenterContainer
