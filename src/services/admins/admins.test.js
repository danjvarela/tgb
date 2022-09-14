import {faker} from "@faker-js/faker";
import {saveToStorage} from "services/storage";
import Admin from "services/admins";

describe("Admin", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const internet = faker.internet;

  const adminProps = {
    username: internet.userName().toLowerCase(),
    email: internet.email().toLowerCase(),
    password: "P@ssword123",
  };

  test("can create new Admin", () => {
    const admin = Admin.new(adminProps);
    expect(admin).toMatchObject({
      ...adminProps,
      createdAt: null,
      errors: {},
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
});
