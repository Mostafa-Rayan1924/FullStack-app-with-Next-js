import LoginForm from "./LoginForm";

const page = async () => {
  return (
    <section
      style={{ height: "calc(100vh - 80px)" }}
      className=" grid place-items-center">
      <LoginForm />
    </section>
  );
};

export default page;
