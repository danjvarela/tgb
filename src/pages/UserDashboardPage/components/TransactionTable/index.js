import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from "@chakra-ui/react";

const TransactionTable = () => {
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

export default TransactionTable;
