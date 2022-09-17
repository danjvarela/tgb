import {faker} from "@faker-js/faker";
import Admin from "services/admins";
import {pipe} from "services/utilities";
import schema from "services/admins/schema";

describe("Admin", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const internet = faker.internet;

  const adminProps = {
    username: internet.userName().toLowerCase(),
    email: internet.email().toLowerCase(),
    password: "P@ssword123",
    confirmPassword: "P@ssword123",
  };

  it("can create a new admin", () => {
    const admin = Admin.new(adminProps);
    expect(admin).toMatchObject({
      ...adminProps,
      createdAt: null,
      id: null,
      isLoggedIn: false,
      id: admin.id,
    });
  });

  it("can save admin to localstorage", () => {
    const savedAdmin = pipe(Admin.new, Admin.save)(adminProps);
    expect(Admin.findBy({id: savedAdmin.id})).toBeDefined();
  });

  it("can get all admins from localstorage", () => {
    [...Array(10).keys()].forEach((_, index) => {
      const username = `${index}${faker.internet.userName()}`;
      pipe(
        Admin.new,
        Admin.save
      )({...adminProps, username: username, email: `${username}@gmail.com`});
    });
    expect(Admin.all().length).toEqual(10);
  });

  it("can update an admin", () => {
    const newEmail = faker.internet.email;
    pipe(Admin.new, Admin.save, (admin) => Admin.update(admin, {email: newEmail}))(
      adminProps
    );
    expect(Admin.findBy({email: newEmail})).toBeDefined();
  });

  it("can delete an existing admin", () => {
    const savedAdmin = pipe(Admin.new, Admin.save)(adminProps);
    expect(Admin.findBy({id: savedAdmin.id})).toBeDefined();
    Admin.delete(savedAdmin);
    expect(Admin.findBy({id: savedAdmin.id})).toEqual(undefined);
  });
});
