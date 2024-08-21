import { Box, Flex, Heading } from "@chakra-ui/react"
import { FC } from "react"


export const Header: FC = () => {

  return (
    <>
      <Flex as="header">
        <Box>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            学習記録一覧
          </Heading>
        </Box>
      </Flex>
    </>
  )
}
