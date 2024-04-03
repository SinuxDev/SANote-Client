import Note from "../components/Note";
import Plus from "../components/Plus";

const index = () => {
  return (
    <section className=" flex gap-6 px-10 mt-10 flex-wrap">
      <Note />
      <Note />
      <Note />
      <Note />
      <Plus />
    </section>
  );
};

export default index;
