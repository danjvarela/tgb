import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from "@chakra-ui/react";
import * as User from "services/User";

const TransferTable = ({user, transfers}) => {
  const getUserFullName = (id) => {
    if (user.id === id) return "You";
    const {firstName, lastName} = User.findById(id);
    return `${firstName} ${lastName}`;
  };

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
            <Th>Amount</Th>
            <Th>Sender</Th>
            <Th>Recipient</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transfers
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((value, index) => (
              <Tr key={index}>
                <Td>{value.id}</Td>
                <Td>
                  {value.amount.toLocaleString(undefined, {
                    style: "currency",
                    currency: "PHP",
                  })}
                </Td>
                <Td>{getUserFullName(value.fromUserId)}</Td>
                <Td>{getUserFullName(value.toUserId)}</Td>
                <Td>{new Date(value.createdAt).toLocaleString()}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TransferTable;
