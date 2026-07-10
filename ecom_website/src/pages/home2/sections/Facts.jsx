import Container from "../../../components/common/Container";

const Facts = () => {

  return (
    <Container className="">
      <div className="w-full flex items-center justify-between pb-50 bordb">
        <div className="text-center">
          <h2 className="large-text font-600 text-dark">125+</h2>
          <p className="para-text mt-12" style={{ color: "#4B5563" }}>Projects Completed</p>
        </div>
        <div className="text-center">
          <h2 className="large-text font-600 text-dark">2+</h2>
          <p className="para-text mt-12" style={{ color: "#4B5563" }}>Years of Experience</p>
        </div>
        <div className="text-center">
          <h2 className="large-text font-600 text-dark">45%</h2>
          <p className="para-text mt-12" style={{ color: "#4B5563" }}>Growing Agency Scale</p>
        </div>
      </div>
    </Container>
  );
};

export default Facts;
