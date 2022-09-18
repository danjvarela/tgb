import {
  HStack,
  TableContainer,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
  Text,
  Button,
  Link,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import CustomBreadcrumb from "./components/CustomBreadcrumb";
import SearchInput from "components/SearchInput";

const UsersPage = () => {
  return (
    <MainLayout>
      <VStack w="full" h="full">
        <HStack w="full" py={2}>
          <CustomBreadcrumb />
          <SearchInput />
        </HStack>
        <HStack w="full" justifyContent="flex-end">
          <Button colorScheme="green">Create new User</Button>
        </HStack>
        <TableContainer w="full">
          <Table variant="simple">
            <Tbody>
              <Tr _hover={{bg: "gray.700"}}>
                <LinkBox>
                  <Td display="flex" flexDir="column" gap={2}>
                    <HStack w="full" justifyContent="space-between" alignItems="end">
                      <Text fontWeight="bold" fontSize="lg" display="flex">
                        User1
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Created by adminName 3 days ago
                      </Text>
                    </HStack>
                    <HStack fontSize="sm" fontWeight="bold">
                      <Link href="#asldj" _hover={{color: "purple.500"}}>
                        Edit
                      </Link>
                      <Link href="#asdasd" _hover={{color: "purple.500"}}>
                        Delete
                      </Link>
                      <LinkOverlay href="#" as={Link} _hover={{color: "purple.500"}}>
                        View
                      </LinkOverlay>
                    </HStack>
                  </Td>
                </LinkBox>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </MainLayout>
  );
};

export default UsersPage;
