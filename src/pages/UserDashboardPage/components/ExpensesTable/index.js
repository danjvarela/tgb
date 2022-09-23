import {TableContainer, Table, Thead, Tr, Th, Tbody, Td} from "@chakra-ui/react";

const ExpensesTable = () => {
  return (
    <TableContainer borderWidth={1} w="full" maxH="md" borderRadius="lg">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>232334535434534</Td>
            <Td>Withdraw</Td>
            <Td>120</Td>
            <Td>{Date.now()}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesTable;
