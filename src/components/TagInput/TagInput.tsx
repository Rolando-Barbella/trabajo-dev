//@ts-ignore
import { WithContext as ReactTags } from "react-tag-input";
import React from "react";

const SKILLS = [
  "AWS",
  "AWS amplify",
  "React Js",
  "React Native",
  "Angular Js",
  "Python",
  "PHP",
  "Laravel",
  "UI/UX",
  ".NET",
  "AI",
  "Blockchain",
  "Solidity",
  "Javascript",
  "J-Query",
  "Google cloud",
  "Ruby",
  "ROR",
  "Ruby on rails",
  "HTML",
  "CSS",
  "C++",
  "Java",
  "Swift",
  "Kotlin",
  "Flutter",
  "IOS",
  "Android",
  "Mobile",
  "Scala",
  "Svelte Js",
  "Next Js",
  "Ruby",
  "Vite",
  "Vue Js",
  "Rust",
  "Go",
  "SQL",
  "Docker",
  "MongoDB",
  "Node Js",
  "ETH",
  "JSON",
  "Graphql",
  "Apollo",
  "Talwind CSS",
  "Typescript",
  "Remix",
  "Rust",
  "Rest API",
  "Scala",
  "Docker"
];

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const suggestions = SKILLS.map((country: string) => {
  return {
    id: country,
    text: country,
    className: "red",
  };
});

type TagInput = {
  tags: [{ id: string; text: string }];
  setTags: React.Dispatch<React.SetStateAction<Array<TagInput["tags"][0]>>>;
};

function TagInput({ tags, setTags }: TagInput) {
  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag: { id: string; text: string }) => {
    setTags([...tags, tag]);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleTagClick={handleTagClick}
        inputFieldPosition="bottom"
        placeholder={"  Enter skills"}
        autocomplete
        autofocus={false}
        allowDragDrop={false}
      />
    </>
  );
}

export default TagInput;
