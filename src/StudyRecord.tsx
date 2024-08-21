import { ChakraProvider } from "@chakra-ui/react"
import { FC } from "react"
import { RecordsTable } from "./components/pages/RecordsTable"


export const StudyRecord: FC = () => {

  return (
    <>
      <ChakraProvider>
        <RecordsTable />
      </ChakraProvider>
    </>
  )
}
