import {HStack, Text, VStack, Link, Tr, Td, useColorModeValue} from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import * as Admin from "services/Admin";

const UserItem = ({user}) => {
  const {firstName, lastName, createdAt, createdBy} = user;
  const adminName = Admin.findById(createdBy).username;

  const lightTheme = {
    _hover: {
      bg: "gray.100",
    },
  };
  const darkTheme = {
    _hover: {
      bg: "gray.700",
    },
  };
  const themeColors = useColorModeValue(lightTheme, darkTheme);
  return (
    <Tr>
      <Td
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        {...themeColors}
      >
        <VStack flexGrow={1} alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold">
            {`${firstName} ${lastName}`}
          </Text>
          <HStack>
            <Link fontSize="sm">View</Link>
            <Link fontSize="sm">Update</Link>
            <Link fontSize="sm">Delete</Link>
          </HStack>
        </VStack>
        <Text fontSize="xs">
          Created by {adminName} <ReactTimeAgo date={createdAt} locale="en-US" />
        </Text>
      </Td>
    </Tr>
  );
};

export default UserItem;
