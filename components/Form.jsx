import Link from "next/link"; // Next.js Link component for client-side navigation

// Define the Form component with expected props
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      {/* Heading of the form with dynamic text based on the form type */}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Label and textarea for entering the AI prompt */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt} // Set the value of the textarea to the prompt state
            onChange={(e) => setPost({ ...post, prompt: e.target.value })} // Update the prompt state on change
            placeholder="Write your prompt here..."
            required // Make the textarea required
            className="form_textarea"
          />
        </label>
        {/* Label and input for entering the Tag */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        {/* Form Action Buttons */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
          {/* Button text changes based on submission status */}
        </div>
      </form>
    </section>
  );
};

export default Form;

/*  -----{type}-----
1.  Dynamic Title and Button Label:
    - In the Form component (components/Form.jsx), {type} is used within the title (<h1>) 
      and the button text. This allows the same form component to be reused for different 
      purposes by changing the value of type.
    - For example, if you set type="Create" when using the Form component, the title will 
      read "Create Post" and the button will show "Create" (or "Creating..." when submitting). 
      If you change type to "Edit", it would read "Edit Post" and "Edit" on the button, 
      respectively.

2.  Descriptive Text:
    - The {type} variable is also used in the description paragraph. This again helps in 
      providing context to what the user is doing - creating a new prompt, editing an 
      existing one, etc.

3.  Button State Text:
    - The use of {type} in the button also dynamically changes its text depending on whether 
      the form is being submitted. For example, if submitting is true and type is "Create", 
      the button will show "Creating...". This provides a visual cue to the user that an action 
      (creation, in this case) is in progress.
*/
