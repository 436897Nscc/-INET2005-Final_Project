import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Signup() {

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // form submit function
  async function formSubmit(data) {
    console.log(JSON.stringify(data));
    const request = new Request("http://localhost:3000/api/users/signup", {
      method: "POST",
      body: JSON.stringify(data)
    });
    const response1 = await fetch(request);
    console.log(response1.status);
  }

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(formSubmit)} method="post" className="w-25">
        <div className="mb-3">
          <label className="form-label">username</label>
          <input {...register("username", { required: "username is required." })} type="text" className="form-control bg-light" />
          {errors.username && <span className="text-danger">{errors.username.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input {...register("password", { required: "Password is required." })} type="password" className="form-control bg-light" />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">email</label>
          <input {...register("email", { required: "email is required." })} type="text" className="form-control bg-light" />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">street</label>
          <input {...register("street", { required: "street is required." })} type="text" className="form-control bg-light" />
          {errors.street && <span className="text-danger">{errors.street.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">city</label>
          <input {...register("city", { required: "city is required." })} type="text" className="form-control bg-light" />
          {errors.city && <span className="text-danger">{errors.city.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input {...register("country", { required: "country is required." })} type="text" className="form-control bg-light" />
          {errors.country && <span className="text-danger">{errors.country.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Postal_code</label>
          <input {...register("postal_code", { required: "postal_code is required." })} type="text" className="form-control bg-light" />
          {errors.postal_code && <span className="text-danger">{errors.postal_code.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
        <Link to="/login" className="btn btn-outline-dark ms-2">Cancel</Link>
      </form>
    </>
  )
}