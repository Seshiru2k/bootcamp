import FormsContainer from "@containers/forms";

const FormsPage = () => {
  return (
    <>
      {/* // type 1 - if will enclose a code
      <Forms>// code</Forms>
      // type 2 - if will call component
      <Forms />
      // type 3 - if will call component and pass value/props
      <Forms id="1" /> */}

      <FormsContainer />
    </>
  );
};

export default FormsPage;

// Page -> Container -> Component
