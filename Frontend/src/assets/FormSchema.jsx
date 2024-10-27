import * as Yup from "yup";
export const addEmployee = Yup.object({
  empName: Yup.string().required(" employee name is required"),
  empEmail: Yup.string().required("email is required"),
  empPhone: Yup.number().required("phone number is required"),
  empDepartment: Yup.string().required("department is required"),
  empAddress: Yup.string().required("address is required"),
});
