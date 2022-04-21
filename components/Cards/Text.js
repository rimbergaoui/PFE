import React, { Component } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

// components
export default class Text extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <Editor
                editorState={editorState}
                editorClassName=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  border box-border h-32 w-32 p-4 border-4  "
                toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
                wrapperClassName="wrapperClassName"
                onEditorStateChange={this.onEditorStateChange}
                placeholder="Enter Content..."
                onChange={handleChange}
                error={
                  errors.title
                    ? { content: "Please enter Content", pointing: "below" }
                    : null
                }
                value={newBlog.description}
              />
            </div>

            <div className="text-center mt-6 "></div>
          </div>
        </div>
      </>
    );
  }
}
