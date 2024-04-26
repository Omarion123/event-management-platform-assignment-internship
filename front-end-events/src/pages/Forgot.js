import React from "react";
import { Link } from "react-router-dom";
import HSInput from "../components/form/HSInput";
import HSButton from "../components/form/HSButton";
import * as formValidation from "../validations/index"
import { useFormik } from "formik";
import { FaEnvelope } from "react-icons/fa";

function Login() {
  const forgot = async () => {
    try {
      if (formik.isValid) {
        const formData = {
          email: formik.values.email,
        };
        console.log("Form Data", formData);
      }
    } catch (error) {
      console.log("Fail to Validate Forgot", error)

    }
  }

  const formik = useFormik({
    validate: formValidation.validateForgotPassword,
    initialValues: {
      email: "",
    },
    onSubmit: forgot,
  });
  return (
    <div className="bg-secondary w-full h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="bg-white w-[90%] md:w-486 h-620 rounded-sm flex justify-center items-center py-10 shadow-md">

          <div className="w-[95%] md:w-[85%] h-full flex flex-col justify-start items-center">
            <h2 className="text-[40px] md:text-[48px] font-extrabold text-primary">Forgot Password?</h2>
            <div className="mt-6 mdl:mt-[34px] w-full">
              <HSInput
                type="input"
                placeholder="Email"
                text="text"
                id="email"
                icon={<FaEnvelope />}
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
            <HSButton
              title={`Submit`}
              click={() => formik.submitForm()}
              styles={`w-full !scale-100 mt-6 mdl:mt-12 bg-primary text-white`}
            />
            <div className="mt-6 mdl:mt-[44px] flex flex-row justify-center w-full text-[20px] md:text-[24px]">
              <Link to="/login" className="hover:underline text-[#3558D4]">
                back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
