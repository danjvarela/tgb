import {HStack, Link, VStack} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import Header from "./components/Header";
import CustomSearchInput from "./components/CustomSearchInput";
import {useMatch} from "react-router-dom";
import {FiChevronLeft} from "react-icons/fi";
import {useEffect, useState} from "react";
import * as User from "services/User";

const MainLayout = ({children, onLogOut, loggedAdmin, onSearch}) => {
  const usersPagePath = useMatch("/users");

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!onSearch) return function () {};

    const pattern = new RegExp(query.toLowerCase(), "g");
    const matches = User.all().filter(
      (user) =>
        pattern.test(user.firstName.toLowerCase()) ||
        pattern.test(user.lastName.toLowerCase())
    );
    onSearch(matches);
  }, [query]);

  const handleChange = ({target}) => setQuery(target.value);

  return (
    <VStack w="full" h="full">
      <Header onLogOut={onLogOut} loggedAdmin={loggedAdmin} />
      <VStack w="full" h="full" flexGrow={1} px={{base: 3, md: 9}}>
        <HStack justifyContent="space-between" alignItems="center" w="full" gap={2}>
          {!usersPagePath ? (
            <Link as={RouterLink} to="/users" display="flex" alignItems="center">
              <FiChevronLeft />
              Back to Users
            </Link>
          ) : null}
          {usersPagePath ? (
            <CustomSearchInput value={query} onChange={handleChange} />
          ) : null}
        </HStack>
        {children}
      </VStack>
    </VStack>
  );
};

export default MainLayout;
