// component to display the profile of the user and their prompts
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      {/* Heading with user name*/}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* Prompt layout of User's Prompts*/}
      <div className="mt-10 prompt_layout">
        {/* map through the data and display the prompt card */}
        {data.map((post) => (
          <PromptCard
            key={post._id} // unique key for each prompt
            post={post} // prompt data
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            // handleEdit and handleDelete are passed as props to the PromptCard component
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
