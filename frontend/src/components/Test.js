import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintableComponent = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h2>Printable Content</h2>
    <p>This is what will be printed.</p>
  </div>
));

const Test = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({
    // content: () => {
    //   console.log("contentRef.current:", contentRef.current);
    //   return contentRef.current
    // },
    // contentRef
    contentRef: contentRef,
  });

  return (
    <div>
      <button onClick={reactToPrintFn}>Print</button>
      <PrintableComponent ref={contentRef} />
    </div>
  );
};


export default Test;
