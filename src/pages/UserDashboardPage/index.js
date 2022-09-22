import {Text} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import {useParams} from "react-router-dom";
import * as User from "services/User";

const UserDashboardPage = () => {
  const {id} = useParams();
  const user = User.findById(id);
  return (
    <MainLayout>
      <Text>
        {user.firstName} {user.lastName}
      </Text>
    </MainLayout>
  );
};

export default UserDashboardPage;
