import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from "@chakra-ui/react";
import {toSentenceCase} from "services/utilities";

const TransactionTable = ({transactions}) => {
  return (
    <TableContainer
      borderWidth={1}
      w="full"
      borderRadius="lg"
      maxH={48}
      overflowY="scroll"
    >
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
          {transactions
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((value, index) => (
              <Tr key={index}>
                <Td>{value.id}</Td>
                <Td>{toSentenceCase(value.type)}</Td>
                <Td>
                  {value.amount.toLocaleString(undefined, {
                    style: "currency",
                    currency: "PHP",
                  })}
                </Td>
                <Td>{new Date(value.createdAt).toString()}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
