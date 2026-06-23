import Container from "../../../components/common/Container";

const Facts = () => {

  return (
    <Container className="">
      <div className="w-full flex items-center justify-between py-70" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.08)" }}>
        <div className="flex flex-column items-center justify-center text-center">
          <h2 className="largehead-text font-800" style={{ color: "#0C0C0F" }}>125+</h2>
          <p className="para-text mt-12" style={{ color: "#4B5563" }}>Projects Completed</p>
        </div>
        <div className="flex flex-column items-center justify-center text-center">
          <h2 className="largehead-text font-800" style={{ color: "#0C0C0F" }}>2+</h2>
          <p className="para-text mt-12" style={{ color: "#4B5563" }}>Years of Experience</p>
        </div>
        <div className="flex flex-column items-center justify-center text-center">
          <h2 className="largehead-text font-800" style={{ color: "#0C0C0F" }}>45%</h2>
          <p className="para-text mt-12" style={{ color: "#4B5563" }}>Growing Agency Scale</p>
        </div>
      </div>
    </Container>
  );
};

export default Facts;
