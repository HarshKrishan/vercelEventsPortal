import React from "react";

const CustomInput = ({ speakers, addSpeaker, handleDelete }) => {
  const [title, setTitle] = React.useState("Mr");
  const [affiliation, setAffiliation] = React.useState("");

  const [show, setShow] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  function addThisSpeaker() {
    if (isOpen) {
      if (title.length > 0 && affiliation.length > 0) {
        addSpeaker(title, affiliation);
        setTitle("Mr");
        setAffiliation("");
      }

      setShow(false);
      setIsOpen(false);
    } else {
      setShow(true);
      setIsOpen(true);
    }
  }

  const [allSpeakers, setAllSpeakers] = React.useState([]);

  React.useEffect(() => {
    setAllSpeakers(speakers);
  }, [speakers]);

  return (
    <>
      <div className=" flex mb-2 flex-start w-3/5">
        <p className="text-black inline-block">Speakers:</p>
        <div className="flex flex-col justify-start w-full">
          {speakers.map((speaker, index) => {
            return (
              <div
                key={index}
                className="flex justify-start gap-x-2 w-3/5 ml-5"
              >
                <p>{speaker.title}</p>
                <p>{speaker.affiliation}</p>
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  ❌
                </button>
              </div>
            );
          })}
        </div>

        <submit
          onClick={addThisSpeaker}
          className=" px-2 py-2 m-1 cursor-pointer "
        >
          {isOpen ? (affiliation.length > 0 ? "✔" : "❌") : "➕"}
        </submit>
      </div>

      {show && (
        <div className="flex ml-3 mb-2">
          <label for="title">Title</label>

          <select
            name="title"
            id="title"
            className="m-2 rounded-md p-1 w-3/5"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          >
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
            <option value="">Prefer not to Say</option>
          </select>
          <br />
          <label for="affiliation">Affiliation</label>
          <input
            type="text"
            name="affiliation"
            id="affiliation"
            placeholder="Affiliation"
            autoComplete="off"
            className="m-2 rounded-md p-1 w-3/5"
            value={affiliation}
            onChange={(e) => {
              setAffiliation(e.target.value);
            }}
          />
        </div>
      )}
    </>
  );
};

export default CustomInput;
