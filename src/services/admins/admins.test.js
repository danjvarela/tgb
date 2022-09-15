import {faker} from "@faker-js/faker";
import {saveToStorage} from "services/storage";
import Admin from "services/admins";
import {pipe} from "services/utilities";

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

  test("can create new Admin", () => {
    const admin = Admin.new(adminProps);
    expect(admin).toMatchObject({
      ...adminProps,
      errors: {},
      createdAt: null,
      loggedIn: false,
    });
  });

  test("can find existing admin from localstorage", () => {
    const admin = {
      ...Admin.new(adminProps),
      createdAt: new Date(),
    };
    saveToStorage("admins", [admin]);
    const adminFromStorage = Admin.find(admin);
    expect(adminFromStorage).toBeDefined();
  });

  test("can save an admin with valid props", () => {
    const admin = Admin.new(adminProps);
    Admin.save(admin);
    expect(Admin.all().length).toEqual(1);
  });

  test("cannot save an admin with invalid email", () => {
    const admin = Admin.new({...adminProps, email: "test"});
    const savedAdmin = Admin.save(admin);
    expect(Admin.hasError(savedAdmin));
  });

  test("cannot save an admin with less than 6 character password", () => {
    const admin = Admin.new({...adminProps, password: "test"});
    const savedAdmin = Admin.save(admin);
    expect(Admin.hasError(savedAdmin));
  });

  test("cannot save an admin if it already exists in localstorage", () => {
    const admin = Admin.new(adminProps);
    Admin.save(admin);
    const duplicateAdmin = Admin.save(admin);
    expect(Admin.hasError(duplicateAdmin));
  });

  test("cannot save an admin if password and confirmation password does not match", () => {
    const admin = Admin.new({...adminProps, confirmPassword: ""});
    const savedAdmin = Admin.save(admin);
    expect(Admin.hasError(savedAdmin));
  });

  test("can update existing admin", () => {
    const newEmail = faker.internet.email().toLowerCase();
    pipe(Admin.new, Admin.save, (admin) => Admin.update(admin, {email: newEmail}))(
      adminProps
    );
    expect(Admin.find({email: newEmail})).toBeDefined();
  });

  test("can log in existing admin", () => {
    const savedAdmin = pipe(Admin.new, Admin.save)(adminProps);
    Admin.logIn(savedAdmin);
    expect(Admin.find(savedAdmin).loggedIn).toEqual(true);
  });

  test("can log out admin", () => {
    const savedAdmin = pipe(Admin.new, Admin.save)(adminProps);
    Admin.logOut(savedAdmin);
    expect(Admin.find(savedAdmin).loggedIn).toEqual(false);
  });

  test("can get all admins", () => {
    [...Array(10)].forEach((_, index) => {
      const created = pipe(
        Admin.new,
        Admin.save
      )({
        ...adminProps,
        email: `${index}${adminProps.email}`,
        username: `${index}${adminProps.username}`,
      });
    });
    expect(Admin.all().length).toEqual(10);
  });
});
