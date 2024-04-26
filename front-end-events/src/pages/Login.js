import React from "react";
import { Link } from "react-router-dom";
import HSInput from "../components/form/HSInput";
import HSButton from "../components/form/HSButton";
import { FaUser, FaLock } from "react-icons/fa";
import * as formValidation from "../validations/index"
import { useFormik } from "formik";

function Login() {

  const auth = async () => {
    try {
      if (formik.isValid) {
        const formData = {
          email: formik.values.email,
          password: formik.values.password,
        };
        console.log("Form Data", formData);
      }
    } catch (error) {
      console.log("Fail to Validate Login", error)

    }
  }

  const formik = useFormik({
    validate: formValidation.validateAuth,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: auth,
  });

  return (
    <div className="bg-secondary w-full h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="bg-white w-[90%] md:w-486 h-620 rounded-sm flex justify-center items-center py-10 shadow-md">

          <div className="w-[95%] md:w-[85%] h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl lx:text-4xl font-extrabold text-primary">HAVASTORE SUPPORT</h2>
            <div className="mt-6 mdl:mt-[34px] w-full">
              <HSInput type="input"
                placeholder="Email"
                id="email" icon={<FaUser />}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className=" text-sm text-red-800 font-normal ">
                  {formik.errors.email}
                </p>
              ) : null}

            </div>
            <div className="mt-6 mdl:mt-[34px] w-full">
              <HSInput
                type="input"
                placeholder="Password"
                text="password"
                id="password"
                icon={<FaLock />}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className=" text-sm text-red-800 font-normal ">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <HSButton
              click={() => formik.submitForm()}
              // title={loading ? "Logging in..." : "Login"}
              title={`Login`}
              styles={`w-full !scale-100 mt-6 mdl:mt-12 bg-primary text-white`}
            />
            <div className="mt-6 mdl:mt-[44px] flex flex-col md:flex-row items-center md:items-center md:justify-center w-full text-[20px] md:text-[24px]">
              <Link
                to="/forgot-password"
                className="hover:underline text-[#3558D4]"
              >
                Forgot password ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
